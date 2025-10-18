import express from "express";
import authRouter from "./features/auth/auth.route";
import merchantRouter from "./features/merchant/merchant.route";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/merchant", merchantRouter);

app.use(errorHandler);

export default app;
