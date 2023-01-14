import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const basicAuth = req.headers["authorization"];
  if (basicAuth) {
    const base64Credentials = basicAuth.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [username, password] = credentials.split(":");
    if (username === "admin" && password === req.app.get("password")) {
      const token = jwt.sign(username, req.app.get("password"));
      res.json({ authentication: "Success", accessToken: token });
    } else {
      res.status(401).json({ code: 401, description: "Authentication Failed" });
    }
  } else {
    res.status(401).json({
      code: 401,
      description:
        "Missing Authentication: Please provide your username and password.",
    });
  }
};
