import { Router } from "express";
const router = Router();

import { getAuth } from "../../middlewares/auth";
import { getConfig, getProducts, getProduct } from "../../controllers/store";

router.get("/", getAuth, getConfig);
router.get("/products", getAuth, getProducts);
router.get("/product/:id", getAuth, getProduct);

router.get("*", (req, res) => {
  res.status(404).json({ code: 404, description: "Not Found" });
});

export default router;
