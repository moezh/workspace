import { Pool } from "pg";
import { readFileSync } from "fs";

const password = readFileSync("/run/secrets/database-password", {
  encoding: "utf8",
});

export const pool = new Pool({
  host: "database",
  user: "postgres",
  password: password,
});
