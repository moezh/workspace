import { Request, Response } from "express";

export const getConfig = async (req: Request, res: Response) => {
  const db = req.app.get("db");
  let sql: string = `SELECT * FROM store_config`;
  let values: string[] = [];
  db.query(sql, values, (err: any, result: { rows: any }) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const data = new Map(
        result.rows.map(({ name, value }: any) => [name, value])
      );
      res.json(Object.fromEntries(data));
    }
  });
};
