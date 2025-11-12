import { NextFunction, Response } from "express";
import { APIResponse } from "../../models/response";
import {
  addStocksService,
  getStocksByMerchantIdService,
  updateStocksService,
} from "./stocks.service";
import { AuthRequest } from "../../middleware/verifyToken";
import z from "zod";
import { addStocksSchema, updateStocksSchema } from "./stocks.schema";
import { uploadToSupabase } from "../../shared/uploadToSupabase";

export const addStocks = async (
  req: AuthRequest,
  res: Response<APIResponse>,
  next: NextFunction
) => {
  try {
    const { merchant_id } = req.params;
    const user_id = req.user?.user_id as string;
    const { name, quantity, price } = req.body as z.infer<
      typeof addStocksSchema
    >;
    console.log(name, quantity, price);
    const files =
      (req.files as {
        [field: string]: Express.Multer.File[];
      }) || null;

    let photoUrl = "";

    // Frontend sends the file under key `product_photo`. Support fallback to `photo_url`.
    const file = files?.product_photo?.[0] || files?.photo_url?.[0];
    if (file) {
      console.log("[stocks.add] using uploaded photo");
      const uploaded = await uploadToSupabase(file, "stocks");
      photoUrl = uploaded.url;
    }

    const stocks = await addStocksService(
      name,
      quantity,
      price,
      photoUrl,
      merchant_id,
      user_id
    );

    return res.status(201).json({
      message: "Stocks added successfully",
      status: "success",
      data: stocks,
    });
  } catch (err) {
    console.error(err)
    next(err);
  }
};

export const getStocksByMerchantId = async (
  req: AuthRequest,
  res: Response<APIResponse>,
  next: NextFunction
) => {
  const { merchant_id } = req.params;
  const stocks = await getStocksByMerchantIdService(merchant_id);
  return res.status(200).json({
    message: "Stocks retrieved successfully",
    status: "success",
    data: stocks,
  });
};

export const updateStocks = async (
  req: AuthRequest,
  res: Response<APIResponse>,
  next: NextFunction
) => {
  try {
    const { stock_id } = req.params;
    const { quantity } = req.body as z.infer<typeof updateStocksSchema>;
    console.log("Updating stock:", stock_id, "with quantity:", quantity);
    const stocks = await updateStocksService(stock_id, quantity);

    return res.status(200).json({
      message: "Stocks updated successfully",
      status: "success",
      data: stocks,
    });
  } catch (err) {
    next(err);
  }
};
