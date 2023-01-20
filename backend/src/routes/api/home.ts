import { Router } from "express";
const router = Router();

import { getAuth } from "../../middlewares/auth";
import {
  getBase,
  getContact,
  getPrivacy,
  getTos,
} from "../../controllers/home";

router.get("/", getAuth, getBase);
router.get("/contact", getAuth, getContact);
router.get("/privacy", getAuth, getPrivacy);
router.get("/tos", getAuth, getTos);

router.get("*", (req, res) => {
  res.status(404).json({ code: 404, description: "Not Found" });
});

export default router;
