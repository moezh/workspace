import { Router } from "express";
const router = Router();

import { getAuth } from "../../middlewares/auth";
import { getConfig } from "../../controllers/web3";

router.get("/config", getAuth, getConfig);

router.get("*", (req, res) => {
  res.status(404).json({ code: 404, description: "Not Found" });
});

export default router;
