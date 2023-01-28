import { pool } from "./db";
import fs from "fs";
import Client from "ssh2-sftp-client";
import readLine from "readline";
import AdmZip from "adm-zip";

export const getDatafeeds = async (
  usernameId: string,
  SubscriptionId: string
) => {
  const privateKey = fs.readFileSync("/run/secrets/cj-private-key", {
    encoding: "utf8",
  });
  const localPath = "./cj/datafeeds/";
  const sftp = new Client();
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
  });
  await pool.query("TRUNCATE TABLE store_datafeeds;");
  fs.readdirSync(localPath).forEach(async (file) => {
    if (file.split(".").pop() === "txt") {
      const lineReader = readLine.createInterface({
        input: require("fs").createReadStream(`${localPath}${file}`),
        crlfDelay: Infinity,
      });
      let header: string = "";
      let isHeader = true;
      for await (const line of lineReader) {
        if (isHeader) {
          isHeader = false;
          header = line.toLowerCase();
        } else {
          const values = line.replaceAll("'", "''").replaceAll('"', "'");
          await pool.query(
            `INSERT INTO store_datafeeds (${header}) VALUES (${values});`
          );
        }
      }
    }
  });
};
