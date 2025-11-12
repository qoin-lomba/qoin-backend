import { NextFunction, Response } from "express";
import { APIResponse } from "../../models/response";
import {
  addMerchantService,
  getMerchantByIdService,
  addMerchantRatingService,
} from "./merchant.service";
import { AuthRequest } from "../../middleware/verifyToken";
import z from "zod";
import { addMerchantRatingSchema, addMerchantSchema } from "./merchant.schema";
import { uploadToSupabase } from "../../shared/uploadToSupabase";

export const addMerchant = async (
  req: AuthRequest,
  res: Response<APIResponse>,
  next: NextFunction
) => {
  try {
    const user_id = req.user?.user_id as string;

    const { name, type, location, description, latitude, longitude } =
      req.body as z.infer<typeof addMerchantSchema>;

    const files = req.files as {
      [field: string]: Express.Multer.File[];
    } | null;

    let profileUrl = "";
    let bannerUrl = "";
    const galleryUrls: string[] = [];

    if (files?.profile_photo?.[0]) {
      // console.log("[merchant.register] uploading profile");
      const uploaded = await uploadToSupabase(
        files.profile_photo[0],
        "profiles"
      );
      profileUrl = uploaded.url;
    }
    if (files?.banner_img?.[0]) {
      // console.log("[merchant.register] uploading banner");
      const uploaded = await uploadToSupabase(files.banner_img[0], "banners");
      bannerUrl = uploaded.url;
    }
    if (files?.gallery_photos && files.gallery_photos.length > 0) {
      // console.log(
      // "[merchant.register] uploading gallery count:",
      // files.gallery_photos.length
      // );
      for (const file of files.gallery_photos) {
        const uploaded = await uploadToSupabase(file, "gallery");
        galleryUrls.push(uploaded.url);
      }
    }

    const latNum = latitude ? parseFloat(latitude) : undefined;
    const lngNum = longitude ? parseFloat(longitude) : undefined;

    const merchant = await addMerchantService({
      user_id,
      name,
      type,
      location,
      description,
      profile_photo: profileUrl,
      banner_img: bannerUrl,
      gallery_photo: galleryUrls[0] || "",
      latitude: latNum,
      longitude: lngNum,
      profilePhotoUrl: profileUrl,
      bannerImageUrl: bannerUrl,
      galleryImages: galleryUrls,
    });

    res.status(201).json({
      message: "Merchant added successfully",
      status: "success",
      data: merchant,
    });
  } catch (err) {
    console.error("[merchant.register] error:", err);
    next(err);
  }
};

export const getMerchantById = async (
  req: AuthRequest,
  res: Response<APIResponse>,
  next: NextFunction
) => {
  try {
    const { merchant_id } = req.params;
    // console.log(merchant_id);
    const merchant = await getMerchantByIdService(merchant_id);

    // console.log(merchant);
    return res.status(200).json({
      message: "Merchant fetched successfully",
      status: "success",
      data: merchant,
    });
  } catch (err) {
    next(err);
  }
};

export const addMerchantRating = async (
  req: AuthRequest,
  res: Response<APIResponse>,
  next: NextFunction
) => {
  try {
    const { merchant_id } = req.params;
    const { user_id } = req.user as { user_id: string };
    const { rate, comment } = req.body as z.infer<
      typeof addMerchantRatingSchema
    >;

    const rating = await addMerchantRatingService(
      merchant_id,
      user_id,
      rate,
      comment
    );

    return res.status(201).json({
      status: "success",
      message: "Merchant rating added successfully",
      data: rating,
    });
  } catch (err) {
    next(err);
  }
};
