import { Request, Response } from "express";
import { Pool } from "pg";

export const getConfig = async (req: Request, res: Response) => {
  const db: Pool = req.app.get("db");
  let sql: string = `SELECT * FROM config`;
  let values: string[] = [];
  db.query(sql, values, (err, result: { rows: Record<string, string>[] }) => {
    if (err) {
      res.status(500).json({ code: 500, description: err });
    } else {
      const data = new Map(result.rows.map(({ name, value }) => [name, value]));
      res.json(Object.fromEntries(data));
    }
  });
};

export const getContact = async (req: Request, res: Response) => {
  const db: Pool = req.app.get("db");
  let sql: string = `SELECT * FROM config where name in ('logo_black', 'logo_white', 'profile_name', 'contact_email', 'contact_whatapp', 'contact_linkedin_url', 'contact_calendly_url', 'contact_summary')`;
  let values: string[] = [];
  db.query(sql, values, (err, result: { rows: Record<string, string>[] }) => {
    if (err) {
      res.status(500).json({ code: 500, description: err });
    } else {
      const data = new Map(result.rows.map(({ name, value }) => [name, value]));
      res.json(Object.fromEntries(data));
    }
  });
};

export const getPrivacy = async (req: Request, res: Response) => {
  const db: Pool = req.app.get("db");
  let sql: string = `SELECT * FROM config where name in ('profile_name')`;
  let values: string[] = [];
  db.query(sql, values, (err, result: { rows: Record<string, string>[] }) => {
    if (err) {
      res.status(500).json({ code: 500, description: err });
    } else {
      const data = new Map(result.rows.map(({ name, value }) => [name, value]));
      res.json(Object.fromEntries(data));
    }
  });
};

export const getTos = async (req: Request, res: Response) => {
  const db: Pool = req.app.get("db");
  let sql: string = `SELECT * FROM config where name in ('profile_name')`;
  let values: string[] = [];
  db.query(sql, values, (err, result: { rows: Record<string, string>[] }) => {
    if (err) {
      res.status(500).json({ code: 500, description: err });
    } else {
      const data = new Map(result.rows.map(({ name, value }) => [name, value]));
      res.json(Object.fromEntries(data));
    }
  });
};
