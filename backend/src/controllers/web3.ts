import { Request, Response } from "express";
import { Pool } from "pg";

export const getConfig = async (req: Request, res: Response) => {
  const db: Pool = req.app.get("db");
  let sql: string = `SELECT * FROM web3_config`;
  let values: string[] = [];
  db.query(sql, values, (err, result: { rows: Record<string, string>[] }) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const data = new Map(result.rows.map(({ name, value }) => [name, value]));
      res.json(Object.fromEntries(data));
    }
  });
};
