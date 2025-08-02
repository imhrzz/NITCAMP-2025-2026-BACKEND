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
exports.updateProfileController = void 0;
const mentee_model_1 = __importDefault(require("../models/mentee.model"));
const mentor_model_1 = __importDefault(require("../models/mentor.model"));
const updateProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const user = req.session.user;
    const updateFields = req.body;
    if (!user) {
        res.status(401).json({ error: "Unauthorized: No user data found in token" });
        return;
    }
    try {
        if (user.role === "mentee") {
            const updatedMentee = yield mentee_model_1.default.update(Object.assign({}, updateFields), { where: { user_id: user.id }, returning: true });
            if (updatedMentee[0] === 0) {
                res.status(404).json({ error: "Mentee not found" });
                return;
            }
            console.log("Updated mentee profile:", (_a = updatedMentee[1][0]) === null || _a === void 0 ? void 0 : _a.toJSON());
            res.status(200).json({ message: "Mentee profile updated successfully", updateFields: (_b = updatedMentee[1][0]) === null || _b === void 0 ? void 0 : _b.toJSON() });
            return;
        }
        else if (user.role === "mentor") {
            const updatedMentor = yield mentor_model_1.default.update(Object.assign({}, updateFields), { where: { user_id: user.id }, returning: true });
            if (updatedMentor[0] === 0) {
                res.status(404).json({ error: "Mentor not found" });
                return;
            }
            console.log("Updated mentor profile:", (_c = updatedMentor[1][0]) === null || _c === void 0 ? void 0 : _c.toJSON());
            res.status(200).json({ message: "Mentor profile updated successfully", updateFields: updatedMentor[1][0] });
            return;
        }
        res.status(400).json({ message: "Invalid user role" });
        return;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.updateProfileController = updateProfileController;
