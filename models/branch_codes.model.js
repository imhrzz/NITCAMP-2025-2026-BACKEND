"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db/db"));
const sequelize_1 = require("sequelize");
const Branch_Codes = db_1.default.define("branch", {
    code: {
        type: sequelize_1.DataTypes.STRING(2),
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    value: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});
exports.default = Branch_Codes;
