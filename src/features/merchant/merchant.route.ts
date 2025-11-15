import { Router } from "express";
import multer from "multer";
import {
  addMerchant,
  getMerchantById,
  addMerchantRating,
  getAllMerchant,
  getUserMerchant,
} from "./merchant.controller";
import { verifyToken } from "../../middleware/verifyToken";
import { addMerchantSchema } from "./merchant.schema";
import { validate } from "../../middleware/validate";
import { addMerchantRatingSchema } from "./merchant.schema";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/all-data", verifyToken, getAllMerchant);

router.post(
  "/register",
  verifyToken,
  upload.fields([
    { name: "profile_photo", maxCount: 1 },
    { name: "banner_img", maxCount: 1 },
    { name: "gallery_photos", maxCount: 6 },
  ]),
  validate(addMerchantSchema, "body"),
  addMerchant
);

router.get("/user", verifyToken, getUserMerchant);

router.get("/id/:merchant_id", getMerchantById);

router.post(
  "/rating/:merchant_id",
  verifyToken,

  validate(addMerchantRatingSchema, "body"),
  addMerchantRating
);

// Payments (grouped via selled_stocks only)
// router.post("/payment", verifyToken, createPaymentGroup); // create group & pending rows
// router.get("/payment/:payment_id", verifyToken, getPaymentGroup); // fetch pending/completed rows
// router.post("/payment/:payment_id", verifyToken, finalizePaymentGroup); // finalize (mark completed & decrement stock)

export default router;
