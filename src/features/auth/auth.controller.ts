import { NextFunction, Request, Response, Router } from "express";
import { APIResponse } from "../../models/response.js";

export const createAccount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;
    console.log(email, password, name);
  } catch (err) {
    next(err);
  }
};

export const loginAccount = (
  req: Request,
  res: Response<APIResponse>,
  next: NextFunction
) => {
  try {
  } catch (err) {
    next(err);
  }
};
