import { Router } from "express";
const router = Router();

import { getAuth } from "../../middlewares/auth";
import { getBase } from "../../controllers/blog";

router.get("/", getAuth, getBase);


router.get("*", (req, res) => {
  res.status(404).json({ code: 404, description: "Not Found" });
});

export default router;
