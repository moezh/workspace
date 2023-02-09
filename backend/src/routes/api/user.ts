import { Router } from "express";
const router = Router();

import { getAuth } from "../../middlewares/auth";
import { login, register, reset, changePassword } from "../../controllers/user";

router.post("/login", getAuth, login);
router.post("/register", getAuth, register);
router.post("/reset", getAuth, reset);
router.post("/password", getAuth, changePassword);

router.get("*", (req, res) => {
  res.status(404).json({ code: 404, description: "Not Found" });
});

export default router;
