import { Router } from "express";
import multer from "multer";
import {
  addStocks,
  getStocksByMerchantId,
  updateStocks,
} from "./stocks.controller";
import { verifyToken } from "../../middleware/verifyToken";
import { validate } from "../../middleware/validate";
import { addStocksSchema, updateStocksSchema } from "./stocks.schema";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", verifyToken);
router.get("/:merchant_id", verifyToken, getStocksByMerchantId);

router.post(
  "/add/:merchant_id",
  verifyToken,
  upload.fields([{ name: "product_photo", maxCount: 1 }]),
  validate(addStocksSchema, "body"),
  addStocks
);

router.patch(
  "/:stock_id",
  verifyToken,
  validate(updateStocksSchema, "body"),
  updateStocks
);

export default router;
