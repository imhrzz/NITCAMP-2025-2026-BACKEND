"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db/db"));
const sequelize_1 = require("sequelize");
const Feedback = db_1.default.define("feedback", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1, 500]
        }
    },
}, {
    tableName: "feedback",
    timestamps: true,
});
exports.default = Feedback;
