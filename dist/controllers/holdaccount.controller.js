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
exports.holdAccountController = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const holdAccountController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        res.status(401).json({ error: "Something went wrong" });
        return;
    }
    try {
        const updatedUser = yield User_model_1.default.update({ is_active: false }, { where: { id: user.id } });
        if (updatedUser[0] === 0) {
            console.log("User not found");
            res.status(404).json({ error: "User not found" });
            return;
        }
        console.log("User is set as inactive");
        // delete cookie
        res.clearCookie("token");
        res.status(200).json({ message: "SUCCESS" }); // log him out once you get success message
        return;
    }
    catch (error) {
        console.log("Error in hold account controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.holdAccountController = holdAccountController;
