import express from "express";
import {pool} from "./services/db";
import {readFileSync} from "fs";
import indexRouter from "./routes";

const app = express();
app.use(express.json());
app.set("db", pool);
try {
  const password = readFileSync("/run/secrets/backend-password", {
    encoding: "utf8",
  });
  app.set("password", password);
} catch (err) {
  throw new Error("Failed to read password");
}
app.use("/", indexRouter);

export default app;
