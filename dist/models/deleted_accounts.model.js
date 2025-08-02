"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db/db"));
const Deleted_Account = db_1.default.define("deleted_account", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_info: {
        type: sequelize_1.DataTypes.JSON,
    },
    role_data: {
        type: sequelize_1.DataTypes.JSON
    }
}, { timestamps: true });
exports.default = Deleted_Account;
