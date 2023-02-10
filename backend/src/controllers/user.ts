import { Request, Response } from "express";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import { sendMail } from "../services/mailer";
import jwt, { JwtPayload } from "jsonwebtoken";

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

export const reset = async (req: Request, res: Response) => {
  const db: Pool = req.app.get("db");
  const { email, host } = req.body;
  let sql: string = `SELECT * FROM users where email=$1`;
  let values: string[] = [email];
  db.query(
    sql,
    values,
    async (err, result: { rows: Record<string, string>[] }) => {
      if (err) {
        res.status(500).json({ code: 500, description: err });
      } else {
        const data = result.rows;
        if (data.length === 0) {
          res.status(404).json({ code: 404, description: "User Not Found" });
        } else {
          const token = jwt.sign({ data: email }, req.app.get("password"), {
            expiresIn: "1h",
          });
          const smtpResponse = await sendMail(
            email,
            "Reset Password",
            `
            Hello ${data[0].first_name},
          
            There was a request to change your password!
          
            If you did not make this request then please ignore this email.
          
            Otherwise, please click this link to change your password:
          
            ${host}/change-password?token=${token}

            This password reset link is only valid for the next 60 minutes.
          
            Thanks,
            The support team
            `
          );
          if (smtpResponse.messageId === undefined) {
            res
              .status(500)
              .json({ code: 500, description: "Failure sending mail" });
          } else {
            res.json({
              code: 200,
              description: "Email sent successfully",
            });
          }
        }
      }
    }
  );
};

export const changePassword = async (req: Request, res: Response) => {
  const db: Pool = req.app.get("db");
  const { password, token } = req.body;
  const password_hash = await bcrypt.hash(password, 10);
  try {
    const decode = jwt.verify(token, req.app.get("password")) as JwtPayload;
    const email = decode.data;
    let sql: string = `UPDATE users SET password_hash = $1 WHERE email=$2`;
    let values: string[] = [password_hash, email];
    db.query(sql, values, (err) => {
      if (err) {
        res.status(500).json({ code: 500, description: err });
      } else {
        res.json({ code: 200, description: "Password updated" });
      }
    });
  } catch (err: any) {
    res.status(401).json({ code: 401, description: err.message });
  }
};
