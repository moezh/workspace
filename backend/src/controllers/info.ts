import { Request, Response } from "express";

export const getInfo = async (req: Request, res: Response) => {
  const db = req.app.get("db");
  let sql: string = `SELECT CURRENT_TIMESTAMP`;
  let values: string[] = [];
  db.query(sql, values, (err: any, result: { rows: any }) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result.rows);
    }
  });
};
