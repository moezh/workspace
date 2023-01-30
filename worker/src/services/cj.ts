import { pool } from "./db";
import fs from "fs";
import Client from "ssh2-sftp-client";
import readLine from "readline";
import AdmZip from "adm-zip";
import { Pool } from "pg";

export const getDatafeeds = async (
  usernameId: string,
  SubscriptionId: string
) => {
  const privateKey = fs.readFileSync("/run/secrets/cj-private-key", {
    encoding: "utf8",
  });
  const localPath = "./cj/datafeeds/";
  /*const sftp = new Client();
  await sftp.connect({
    host: "datatransfer.cj.com",
    port: 22,
    username: usernameId,
    privateKey: privateKey,
    algorithms: {
      serverHostKey: ["ssh-rsa", "ssh-dss"],
    },
  });
  const remotePath = `/outgoing/productcatalog/${SubscriptionId}`;
  fs.rmSync(localPath, { recursive: true, force: true });
  await sftp.downloadDir(remotePath, localPath);
  sftp.end();
  fs.readdirSync(localPath).forEach((file) => {
    if (file.split(".").pop() === "zip") {
      const filePath = `${localPath}${file}`;
      const zip = new AdmZip(filePath);
      zip.extractAllTo(localPath, true);
      fs.unlink(`${localPath}${file}`, (err) => {
        if (err) console.log(err);
      });
    }
  });*/
  await pool.query(`
  DROP TABLE IF EXISTS store_datafeeds_temp;
  CREATE TABLE store_datafeeds_temp (LIKE store_datafeeds INCLUDING ALL);
  `);
  fs.readdirSync(localPath).forEach(async (file) => {
    if (file.split(".").pop() === "txt") {
      const lineReader = readLine.createInterface({
        input: require("fs").createReadStream(`${localPath}${file}`),
        crlfDelay: Infinity,
      });
      let header: string = "";
      let isHeader = true;
      const clientDB = await pool.connect();
      for await (const line of lineReader) {
        if (isHeader) {
          isHeader = false;
          header = line.toLowerCase();
        } else {
          const values = line.replaceAll("'", "''").replaceAll('"', "'");
          await clientDB.query(
            `INSERT INTO store_datafeeds_temp (${header}) VALUES (${values}) ON CONFLICT DO NOTHING;`
          );
        }
      }
      clientDB.release();
      await pool.query(`
      DROP TABLE IF EXISTS store_datafeeds;
      ALTER TABLE store_datafeeds_temp RENAME TO store_datafeeds;
      `);
      await pool.query(`
      DROP TABLE IF EXISTS store_products_category;
      CREATE TABLE store_products_category as (SELECT distinct(google_product_category_name) as category FROM store_datafeeds WHERE google_product_category_name is not null);
      `);
      await pool.query(`
      DROP TABLE IF EXISTS store_products_count;
      CREATE TABLE store_products_count as (SELECT product_category_id, product_category_name, count(distinct(product_uid)) as product_count
      FROM store_datafeeds 
      group by product_category_id, product_category_name);
      `);
      console.log("> Datafeeds Synced");
    }
  });
};
