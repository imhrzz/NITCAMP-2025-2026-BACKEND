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
exports.feedbackController = void 0;
const feedback_model_1 = __importDefault(require("../models/feedback.model"));
const feedbackController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.session.user;
    if (!user) {
        console.log("No user found");
        res.status(401).json({ error: "No user found" });
        return;
    }
    const { content } = req.body;
    try {
        const feedback = yield feedback_model_1.default.create({
            user_id: user.id,
            content: content
        });
        console.log("Feedback created:", feedback.toJSON());
        res.status(201).json({ message: "Feedback submitted successfully", feedback: feedback });
        return;
    }
    catch (error) {
        console.error("Error processing feedback:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.feedbackController = feedbackController;
