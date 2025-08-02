"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidation = void 0;
const sqllogger_1 = __importDefault(require("../utility/sqllogger"));
const MODE = process.env.MODE;
const adminValidation = (req, res, next) => {
    if (req.user) {
        if (req.user.role === "admin") {
            return next();
        }
        else {
            res.status(403).json({ error: "Forbidden: Admins only" }); // 403 for authenticated but not allowed
            if (MODE === "production") {
                sqllogger_1.default.error("Unauthorized user tried accessing admin route", { email: req.user.email, role: req.user.role });
            }
            return;
        }
    }
    else {
        res.status(401).json({ error: "Unauthorized: No user found" }); // 401 for not authenticated
        if (MODE === "production") {
            sqllogger_1.default.error("Unauthenticated user tried accessing admin route");
        }
        return;
    }
};
exports.adminValidation = adminValidation;
