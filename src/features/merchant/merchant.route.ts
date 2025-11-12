import { Router } from "express";
import multer from "multer";
import {
  addMerchant,
  getMerchantById,
  addMerchantRating,
} from "./merchant.controller";
import { verifyToken } from "../../middleware/verifyToken";
import { addMerchantSchema } from "./merchant.schema";
import { validate } from "../../middleware/validate";
import { addMerchantRatingSchema } from "./merchant.schema";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

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

router.get("/:merchant_id", verifyToken, getMerchantById);

router.post(
  "/rating/:merchant_id",
  verifyToken,

  validate(addMerchantRatingSchema, "body"),
  addMerchantRating
);

export default router;
