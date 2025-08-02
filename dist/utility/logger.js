"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const util_1 = __importDefault(require("util"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { transports, format } = winston_1.default;
const logger = winston_1.default.createLogger({
    level: "http",
    format: format.combine(format.timestamp({ format: "YYYY-MM-DD HH-mm" }), format.printf(({ timestamp, level, message }) => {
        const formattedMessage = typeof message === "object" ? util_1.default.inspect(message, { depth: null, colors: true }) : message;
        return `${timestamp} [${level.toUpperCase()}] - ${formattedMessage}`;
    })),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: "logs/combined.log",
            level: "info"
        }),
        new transports.File({
            filename: "logs/http_requests.log",
            level: "http",
            format: format.combine(format((info) => info.level === "http" ? info : false)())
        }),
    ]
});
exports.default = logger;
