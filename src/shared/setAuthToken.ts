import jwt from "jsonwebtoken";
import { Response } from "express";

const setAuthToken = (userId: string, res: Response) => {
  const token = jwt.sign(
    { user_id: userId },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  const isProd = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // allow HTTP in local dev
    sameSite: "none", // enable cross-site cookie on localhost
    path: "/",
  });
};

export default setAuthToken;
