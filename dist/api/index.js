"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../src/app"));
const serverless_http_1 = __importDefault(require("serverless-http"));
// Wrap the Express app for Vercel Serverless Functions
exports.default = (0, serverless_http_1.default)(app_1.default);
