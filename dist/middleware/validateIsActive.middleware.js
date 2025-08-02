"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIsActive = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const MODE = process.env.MODE;
const validateIsActive = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.session.user;
    if (!user) {
        res.status(401).json({ error: "Something went wrong" });
        return;
    }
    try {
        const dbUser = yield User_model_1.default.findOne({ where: { id: user.id } });
        if (!(dbUser === null || dbUser === void 0 ? void 0 : dbUser.toJSON().is_active)) {
            res.status(403).json({ error: "User is inactive" });
            return;
        }
        next();
    }
    catch (error) {
        console.log("Error in validateIsActive middleware:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.validateIsActive = validateIsActive;
