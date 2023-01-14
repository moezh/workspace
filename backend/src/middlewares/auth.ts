import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

export const getAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(
      bearerToken,
      req.app.get("password"),
      (err: VerifyErrors | null) => {
        if (err) {
          res
            .status(401)
            .json({ code: 401, description: "Authorization Failed" });
        } else {
          next();
        }
      }
    );
  } else {
    res.status(401).json({
      code: 401,
      description: "Missing Authorization: Please provide your token.",
    });
  }
};
