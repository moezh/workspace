import { Router } from "express";
const router = Router();

import loginRouter from "./auth/login";
import userRouter from "./api/user";
import homeRouter from "./api/home";
import blogRouter from "./api/blog";
import storeRouter from "./api/store";
import web3Router from "./api/web3";
import workoutRouter from "./api/workout";

router.use("/auth/login", loginRouter);
router.use("/api/user", userRouter);
router.use("/api/home", homeRouter);
router.use("/api/blog", blogRouter);
router.use("/api/store", storeRouter);
router.use("/api/web3", web3Router);
router.use("/api/workout", workoutRouter);

router.get("*", (req, res) => {
  res.status(404).json({ code: 404, description: "Not Found" });
});

export default router;
