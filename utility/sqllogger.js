"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const dotenv_1 = __importDefault(require("dotenv"));
const sqlTransports_1 = __importDefault(require("./sqlTransports"));
dotenv_1.default.config();
const { transports, format } = winston_1.default;
const sqllogger = winston_1.default.createLogger({
    level: "http",
    transports: [
        new sqlTransports_1.default(),
    ]
});
exports.default = sqllogger;
