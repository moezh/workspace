import { Router } from "express";
const router = Router();

import loginRouter from "./auth/login";
import infoRouter from "./api/info";

router.use("/auth/login", loginRouter);
router.use("/api/info", infoRouter);

router.get("*", (req, res) => {
  res.status(404).json({ code: 404, description: "Not Found" });
});

export default router;
