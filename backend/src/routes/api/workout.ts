import { Router } from "express";
const router = Router();

import { getAuth } from "../../middlewares/auth";
import { getConfig } from "../../controllers/workout";

router.get("/", getAuth, getConfig);

router.get("*", (req, res) => {
  res.status(404).json({ code: 404, description: "Not Found" });
});

export default router;
