import { NextFunction, Request, Response } from "express";
import { APIResponse } from "../../models/response";
import z from "zod";
import { signUpSchema } from "./auth.schema";
import {
  createAccountService,
  getUserService,
  loginAccountService,
} from "./auth.service";
import setAuthToken from "../../shared/setAuthToken";
import { AuthRequest } from "../../middleware/verifyToken";

export const createAccount = async (
  req: Request,
  res: Response<APIResponse>,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as z.infer<typeof signUpSchema>;
    console.log(`Email: ${email}, Password: ${password}`);
    const user = await createAccountService(email, password);

    return res.status(201).json({
      message: "Account created successfully",
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

export const loginAccount = async (
  req: Request,
  res: Response<APIResponse>,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    console.log(`Login attempt - Email: ${email}, Password: ${password}`);
    const user = await loginAccountService(email, password);

    setAuthToken(user.id, res);

    return res.status(200).json({
      message: "Login successful",
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: AuthRequest,
  res: Response<APIResponse>,
  next: NextFunction
) => {
  try {
    const userId = req.user?.user_id as string;
    const user = await getUserService(userId);

    return res.status(200).json({
      message: "User retrieved successfully",
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
