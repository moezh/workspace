import { Request, Response } from "express";
import { Pool } from "pg";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  const db: Pool = req.app.get("db");
  const { email, password } = req.body;
  let sql: string = `SELECT * FROM users where email=$1`;
  let values: string[] = [email];
  db.query(sql, values, (err, result: { rows: Record<string, string>[] }) => {
    if (err) {
      res.status(500).json({ code: 500, description: err });
    } else {
      const data = result.rows;
      if (data.length === 0) {
        res.status(404).json({ code: 404, description: "User Not Found" });
      } else {
        bcrypt.compare(password, data[0].password_hash, function (err, result) {
          if (result) {
            let response = data[0];
            delete response.password_hash;
            res.json(response);
          } else {
            res
              .status(401)
              .json({ code: 401, description: "User Authentication Failed" });
          }
        });
      }
    }
  });
};

export const register = async (req: Request, res: Response) => {
  const db: Pool = req.app.get("db");
  const { email, first_name, last_name, password } = req.body;
  const password_hash = await bcrypt.hash(password, 10);
  let sql: string = `INSERT INTO users (email, first_name, last_name, password_hash) VALUES ($1,$2,$3,$4);`;
  let values: string[] = [email, first_name, last_name, password_hash];
  db.query(sql, values, (err) => {
    if (err) {
      res.status(500).json({ code: 500, description: err });
    } else {
      let response = {
        email: email,
        first_name: first_name,
        last_name: last_name,
        user_data: "{}",
      };
      res.json(response);
    }
  });
};
