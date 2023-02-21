import {Pool} from "pg";
import fs from "fs";

const password = fs.readFileSync("/run/secrets/database-password", {
  encoding: "utf8",
});

export const pool = new Pool({
  host: "database",
  user: "postgres",
  password: password,
});
