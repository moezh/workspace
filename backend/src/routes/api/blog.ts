import { Router } from "express";
const router = Router();

import { getAuth } from "../../middlewares/auth";
import { getPosts, getPost } from "../../controllers/blog";

router.get("/", getAuth, getPosts);
router.get("/post/:id", getAuth, getPost);

router.get("*", (req, res) => {
  res.status(404).json({ code: 404, description: "Not Found" });
});

export default router;
