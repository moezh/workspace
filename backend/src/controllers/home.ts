import { Request, Response } from "express";

export const getBase = async (req: Request, res: Response) => {
  const db = req.app.get("db");
  let sql: string = `SELECT * FROM config`;
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

export const getContact = async (req: Request, res: Response) => {
  const db = req.app.get("db");
  let sql: string = `SELECT * FROM config where name in ('logo_black', 'logo_white', 'contact_email', 'contact_whatapp', 'contact_linkedin_url', 'contact_calendly_url')`;
  let values: string[] = [];
  db.query(sql, values, (err: any, result: { rows: any }) => {
    if (err) {
      res.status(500).json(err);
    } else {
      console.log("ok");
      const data = new Map(
        result.rows.map(({ name, value }: any) => [name, value])
      );
      res.json(Object.fromEntries(data));
    }
  });
};

export const getPrivacy = async (req: Request, res: Response) => {
  const db = req.app.get("db");
  let sql: string = `SELECT * FROM config where name in ('logo_black', 'logo_white')`;
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

export const getTos = async (req: Request, res: Response) => {
  const db = req.app.get("db");
  let sql: string = `SELECT * FROM config where name in ('logo_black', 'logo_white', 'profile_name')`;
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
