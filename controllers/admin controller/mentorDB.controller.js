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
exports.mentorDBController = void 0;
const mentor_model_1 = __importDefault(require("../../models/mentor.model"));
const User_model_1 = __importDefault(require("../../models/User.model"));
const mentorDBController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mentors = yield mentor_model_1.default.findAll({
            include: [
                {
                    model: User_model_1.default,
                    as: 'user',
                    where: { is_active: true }
                }
            ],
            order: [["createdAt", "DESC"]]
        });
        if (!mentors || mentors.length === 0) {
            res.status(404).json({ error: "No mentors found" });
            return;
        }
        console.log("Fetched mentors:", mentors.map(user => user.toJSON()));
        res.status(200).json({ message: "SUCCESS", mentors });
        return;
    }
    catch (error) {
        console.error("Error in mentorDBController:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.mentorDBController = mentorDBController;
