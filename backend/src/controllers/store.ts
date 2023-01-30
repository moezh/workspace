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
  const category =
    req.query.category === undefined ? "%" : (req.query.category as string);
  const search =
    req.query.search === undefined ? "" : (req.query.search as string);
  let sql: string = `
  SELECT product_uid, title, brand, product_category_name, image_link, price, sale_price
  FROM store_datafeeds 
  WHERE product_category_id like $3
  AND text_search @@ websearch_to_tsquery('english', $4)
  GROUP BY product_uid, title, brand, product_category_name, image_link, price, sale_price
  LIMIT $1
  OFFSET $2
  `;
  let values: string[] = [limit, offset, category, search];
  db.query(sql, values, (err: any, result: { rows: any }) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const data = result.rows;
      res.json(data);
    }
  });
};

export const getProductsCount = async (req: Request, res: Response) => {
  const db = req.app.get("db");
  let sql: string;
  let values: string[];
  if (req.query.category === undefined) {
    sql = `
    SELECT 'All Products' as product_category_name, sum(product_count) as product_count
    FROM store_products_count
    `;
    values = [];
  } else {
    sql = `
    SELECT product_category_name, product_count
    FROM store_products_count
    WHERE product_category_id like $1
    `;
    values = [req.query.category as string];
  }
  db.query(sql, values, (err: any, result: { rows: any }) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const data = result.rows[0];
      res.json(data);
    }
  });
};

export const getProduct = async (req: Request, res: Response) => {
  const db = req.app.get("db");
  const uid = req.params.uid;
  let sql: string = `
  SELECT  title, brand, product_category_name, description, gtin, link, image_link, additional_image_link, 
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
        const reducedData = data.reduce((accumulator: any, current: any) => {
          Object.entries(current).forEach((entry) => {
            const [key, value] = entry;
            if (!accumulator[key]) {
              accumulator[key] = [];
            }
            if (!accumulator[key].includes(value)) {
              accumulator[key].push(value);
            }
          });
          return accumulator;
        }, {});
        res.json(reducedData);
      }
    }
  });
};

export const getCategories = async (req: Request, res: Response) => {
  const db = req.app.get("db");
  let sql: string = `select category from store_products_category;`;
  let values: string[] = [];
  db.query(sql, values, (err: any, result: { rows: any }) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const data = result.rows;
      const reducedData = data.reduce((accumulator: any, current: any) => {
        Object.values(current).forEach((value: any) => {
          const categories = value.split(" > ");
          categories.forEach((category: any, index: number) => {
            const parent = index === 0 ? "Root" : categories[index - 1];
            if (!accumulator[parent]) {
              accumulator[parent] = [];
            }
            if (
              !accumulator[parent].includes(category) &&
              !accumulator[parent].includes(`${category} →`)
            ) {
              accumulator[parent].push(category);
            }
            if (category === categories[categories.length - 1]) {
              if (accumulator[parent].includes(category)) {
                accumulator[parent] = accumulator[parent].filter(
                  (item: any) => item !== category
                );
              }
              if (!accumulator[parent].includes(`${category} →`)) {
                accumulator[parent].push(`${category} →`);
              }
            }
          });
        });
        return accumulator;
      }, {});
      res.json(reducedData);
    }
  });
};

export const getLink = async (req: Request, res: Response) => {
  const db = req.app.get("db");
  const gtin = req.params.gtin;
  let sql: string = `
  SELECT link
  FROM store_datafeeds 
  WHERE gtin = $1
  `;
  let values: string[] = [gtin];
  db.query(sql, values, (err: any, result: { rows: any }) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const data = result.rows;
      if (data.length === 0) {
        res.status(404).json({ code: 404, description: "Not Found" });
      } else {
        res.json(data[0]);
      }
    }
  });
};
