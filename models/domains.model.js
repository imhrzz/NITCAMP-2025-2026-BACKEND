"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db/db"));
const sequelize_1 = require("sequelize");
const Domains = db_1.default.define("domains", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    domain_name: {
        type: sequelize_1.DataTypes.STRING,
        validate: { len: [1, 100] },
        allowNull: false
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        validate: { len: [1, 8] },
        unique: true,
        allowNull: false
    },
    value: {
        type: sequelize_1.DataTypes.STRING,
        validate: { len: [1, 100] },
        unique: true,
        allowNull: false
    },
    default: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
});
exports.default = Domains;
