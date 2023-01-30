import { Router } from "express";
const router = Router();

import { getAuth } from "../../middlewares/auth";
import {
  getConfig,
  getProducts,
  getProduct,
  getCategories,
  getLink,
  getProductsCount,
} from "../../controllers/store";

router.get("/", getAuth, getConfig);
router.get("/products", getAuth, getProducts);
router.get("/products/count", getAuth, getProductsCount);
router.get("/product/:uid", getAuth, getProduct);
router.get("/categories", getAuth, getCategories);
router.get("/link/:gtin", getAuth, getLink);

router.get("*", (req, res) => {
  res.status(404).json({ code: 404, description: "Not Found" });
});

export default router;
