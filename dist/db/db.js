"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DATABASE_MODE = process.env.DATABASE_MODE;
const DATABASE_URL = DATABASE_MODE === "supabase" ? process.env.SUPABASE_URL : process.env.LOCAL_DATABASE_URL;
const sequelize = new sequelize_1.Sequelize(DATABASE_URL || "", {
    dialect: "postgres",
    logging: false
});
exports.default = sequelize;
