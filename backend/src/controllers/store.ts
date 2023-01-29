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
  const limit =
    req.query.limit === undefined ? "100" : (req.query.limit as string);
  const offset =
    req.query.offset === undefined ? "0" : (req.query.offset as string);
  let sql: string = `
  SELECT product_uid, title, brand, image_link, price, sale_price
  FROM store_datafeeds 
  GROUP BY product_uid, title, brand, image_link, price, sale_price
  LIMIT $1
  OFFSET $2
  `;
  let values: string[] = [limit, offset];
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
  const uid = req.params.uid;
  let sql: string = `
  SELECT  title, brand, description, link, image_link, additional_image_link, 
  condition, availability, price, sale_price, age_group, gender, color, size, material, pattern 
  FROM store_datafeeds 
  WHERE product_uid = $1
  `;
  let values: string[] = [uid];
  db.query(sql, values, (err: any, result: { rows: any }) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const data = result.rows;
      if (data.length === 0) {
        res.status(404).json({ code: 404, description: "Not Found" });
      } else {
        const reducedData = data.reduce(
          (accumulator: any, currentProduct: any) => {
            Object.entries(currentProduct).forEach((entry) => {
              const [key, value] = entry;
              if (!accumulator[key]) {
                accumulator[key] = [];
              }
              if (!accumulator[key].includes(value)) {
                accumulator[key].push(value);
              }
            });
            return accumulator;
          },
          {}
        );
        /*Object.keys(reducedData).forEach((key) => {
          if (reducedData[key].length === 1) {
            reducedData[key] = reducedData[key][0];
          }
        });*/
        res.json(reducedData);
      }
    }
  });
};

export const getCategories = async (req: Request, res: Response) => {
  const db = req.app.get("db");
  let sql: string = `select distinct(google_product_category_name) from store_datafeeds;`;
  let values: string[] = [];
  db.query(sql, values, (err: any, result: { rows: any }) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const data = result.rows;
      const reducedData = data.reduce((accumulator: any, currentItem: any) => {
        Object.values(currentItem).forEach((value: any) => {
          const valueSplit = value.split(" > ");
          valueSplit.forEach((category: any, index: number) => {
            const parentCategory = index === 0 ? "Root" : valueSplit[index - 1];
            if (!accumulator[parentCategory]) {
              accumulator[parentCategory] = [];
            }
            if (!accumulator[parentCategory].includes(category)) {
              accumulator[parentCategory].push(category);
            }
          });
        });
        return accumulator;
      }, {});
      res.json(reducedData);
    }
  });
};
