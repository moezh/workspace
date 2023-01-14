import { Router } from "express";
const router = Router();

import { getAuth } from "../../middlewares/auth";
import { getInfo } from "../../controllers/info";

router.get("/", getAuth, getInfo);

router.get("*", (req, res) => {
  res.status(404).json({ code: 404, description: "Not Found" });
});

export default router;
