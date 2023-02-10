import { pool } from "./db";
import fs from "fs";
import Client from "ssh2-sftp-client";
import readLine from "readline";
import AdmZip from "adm-zip";

import { readFileSync } from "fs";

const cjFile = readFileSync("/run/secrets/cj-config", {
  encoding: "utf8",
});
const { userId, subscriptionId } = JSON.parse(cjFile);

const privateKey = fs.readFileSync("/run/secrets/cj-private-key", {
  encoding: "utf8",
});

export const getCjDatafeeds = async () => {
  console.log("> Download datafeeds");
  const localPath = "./cj/datafeeds/";
  const sftp = new Client();
  await sftp.connect({
    host: "datatransfer.cj.com",
    port: 22,
    username: userId,
    privateKey: privateKey,
    algorithms: {
      serverHostKey: ["ssh-rsa", "ssh-dss"],
    },
  });
  const remotePath = `/outgoing/productcatalog/${subscriptionId}`;
  fs.rmSync(localPath, { recursive: true, force: true });
  await sftp.downloadDir(remotePath, localPath, { useFastget: true });
  sftp.end();
  console.log("> Unzip datafeeds");
  fs.readdirSync(localPath).forEach((file) => {
    if (file.split(".").pop() === "zip") {
      const filePath = `${localPath}${file}`;
      const zip = new AdmZip(filePath);
      zip.extractAllTo(localPath, true);
    }
  });
  await pool.query("TRUNCATE TABLE store_datafeeds;");
  fs.readdirSync(localPath).forEach(async (file) => {
    if (file.split(".").pop() === "txt") {
      console.log(`> Read datafeed: ${file}`);
      const lineReader = readLine.createInterface({
        input: require("fs").createReadStream(`${localPath}${file}`),
        crlfDelay: Infinity,
      });
      let isHeader = true;
      for await (const line of lineReader) {
        if (isHeader) {
          isHeader = false;
        } else {
          const values = line.replaceAll("'", "''").replaceAll('"', "'");
          await pool.query(
            `INSERT INTO store_datafeeds VALUES (${values}) ON CONFLICT DO NOTHING;`
          );
        }
      }
      await pool.query(`
          DROP TABLE IF EXISTS store_products_category;
          CREATE TABLE store_products_category as (SELECT distinct(google_product_category_name) as category FROM store_datafeeds WHERE google_product_category_name <> '');
          `);
      await pool.query(`
          DROP TABLE IF EXISTS store_products_count;
          CREATE TABLE store_products_count as (SELECT product_category_id, product_category_name, count(product_uid) as product_count
          FROM store_datafeeds 
          group by product_category_id, product_category_name);
          `);
      console.log(`> Datafeed Synced: ${file}`);
    }
  });
};
