import { Router } from "express";
const router = Router();

import { login } from "../../controllers/login";

router.get("/", login);

router.get("*", (req, res) => {
  res.status(404).json({ code: 404, description: "Not Found" });
});

export default router;
