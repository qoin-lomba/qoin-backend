import express from "express";
import authRouter from "./features/auth/auth.route";
import merchantRouter from "./features/merchant/merchant.route";
import stocksRouter from "./features/stocks/stocks.route";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://qoin-frontend.vercel.app"],
    credentials: true,
  })
);

// ROUTER
app.use("/api/auth", authRouter);
app.use("/api/merchant", merchantRouter);
app.use("/api/stocks", stocksRouter);

// MIDDLEWARE HANDLING ERROR
app.use(errorHandler);

export default app;
