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

export const getProducts = async (req: Request, res: Response) => {
  const db = req.app.get("db");
  let sql: string = `
  SELECT product_uid, title, image_link, price, sale_price, brand
  FROM store_datafeeds 
  GROUP BY product_uid, title, image_link, price, sale_price, brand
  LIMIT 100
  OFFSET 0
  `;
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

export const getProduct = async (req: Request, res: Response) => {
  const db = req.app.get("db");
  const id = req.params.id;
  let sql: string = `
  SELECT title, description, link, impression_url, image_link, additional_image_link, availability, price, sale_price, brand, condition, age_group, color, gender, size
  FROM store_datafeeds
  WHERE product_uid=$1
  `;
  console.log(id);
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
