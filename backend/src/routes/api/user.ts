import { Router } from "express";
const router = Router();

import { getAuth } from "../../middlewares/auth";
import { login, register } from "../../controllers/user";

router.post("/login", getAuth, login);
router.post("/register", getAuth, register);

router.get("*", (req, res) => {
  res.status(404).json({ code: 404, description: "Not Found" });
});

export default router;
