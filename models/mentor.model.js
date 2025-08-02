"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db/db"));
const sequelize_1 = require("sequelize");
const User_model_1 = __importDefault(require("./User.model"));
const Mentor = db_1.default.define("mentor", {
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
    year_graduated: {
        type: sequelize_1.DataTypes.INTEGER(),
        allowNull: false,
        validate: { len: [4, 4] }
    },
    phone_no: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { len: [4, 20] }
    },
    highest_degree_at_nitc_code: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    department_code: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    mentoring_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['one-on-one', 'community-mentoring']]
        }
    },
    mentee_capacity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: { len: [1, 5] }
    },
    broad_area_of_expertise: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.TEXT),
        allowNull: true
    },
    narrow_area_of_expertise: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.TEXT),
        allowNull: true
    },
}, { timestamps: true });
Mentor.belongsTo(User_model_1.default, { foreignKey: 'user_id', as: 'user' });
exports.default = Mentor;
