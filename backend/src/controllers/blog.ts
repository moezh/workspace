import { Request, Response } from "express";

export const getConfig = async (req: Request, res: Response) => {
  const db = req.app.get("db");
  let sql: string = `SELECT * FROM blog_config`;
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

export const getPosts = async (req: Request, res: Response) => {
  const db = req.app.get("db");
  let sql: string = `SELECT id, title, tags, summary FROM blog_posts`;
  let values: string[] = [];
  db.query(sql, values, (err: any, result: { rows: any }) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const data = result.rows;
      res.json(data);
    }
  });
};

export const getPost = async (req: Request, res: Response) => {
  const db = req.app.get("db");
  const id = req.params.id;
  let sql: string = `SELECT * FROM blog_posts where id = $1`;
  let values: string[] = [id];
  db.query(sql, values, (err: any, result: { rows: any }) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const data = result.rows[0];
      if (data === undefined)
        res.status(404).json({ code: 404, description: "Not Found" });
      res.json(data);
    }
  });
};
