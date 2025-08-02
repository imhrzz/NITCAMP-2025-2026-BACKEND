"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db/db"));
const sequelize_1 = require("sequelize");
const User_model_1 = __importDefault(require("./User.model"));
const Mentee = db_1.default.define("mentee", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User_model_1.default,
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    roll_no: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    year_of_admission: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: { len: [0, 4] }
    },
    personal_email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            len: [4, 60]
        }
    },
    phone_no: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { len: [4, 20] }
    },
    degree_code: {
        type: sequelize_1.DataTypes.STRING(1),
        allowNull: false,
    },
    branch_code: {
        type: sequelize_1.DataTypes.STRING(2),
        allowNull: false,
    },
    broad_area_of_interest: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.TEXT),
        allowNull: true
    },
    narrow_area_of_interest: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.TEXT),
        allowNull: true
    },
}, { timestamps: true });
Mentee.belongsTo(User_model_1.default, { foreignKey: 'user_id', as: 'user' });
exports.default = Mentee;
