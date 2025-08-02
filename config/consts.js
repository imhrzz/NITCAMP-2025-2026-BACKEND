"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE_OPTIONS = exports.JWT_SECRET = exports.GOOGLE_CLIENT_ID = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.MODE === "production",
    sameSite: process.env.MODE === "production" ? "none" : "lax",
    maxAge: 24 * 24 * 60 * 60 * 1000 // 24 days
};
