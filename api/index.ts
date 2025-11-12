import app from "../src/app";
import serverless from "serverless-http";

// Wrap the Express app for Vercel Serverless Functions
export default serverless(app);
