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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenteeExtraInfoController = void 0;
const menteeInitailnfo_service_1 = require("../services/menteeInitailnfo.service");
const getMenteeExtraInfoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("✅ Get Mentee Extra Info Controller Hit");
    try {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ error: "User not found" });
            return;
        }
        const menteeExtraInfo = yield (0, menteeInitailnfo_service_1.menteeInitailInfo)(user.email);
        res.status(201).json({ message: "SUCCESS", menteeExtraInfo });
        return;
    }
    catch (error) {
        console.log("Error in getting mentee info:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.getMenteeExtraInfoController = getMenteeExtraInfoController;
