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
exports.getMyMentorController = void 0;
const matched_users_model_1 = __importDefault(require("../models/matched_users.model"));
const mentor_model_1 = __importDefault(require("../models/mentor.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const getDomainsValues_service_1 = require("../services/getDomainsValues.service");
const MODE = process.env.MODE;
const getMyMentorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.session.user;
    if (!user) {
        res.status(401).json({ error: "Something went wrong" });
        return;
    }
    try {
        const matchedMentor = yield matched_users_model_1.default.findOne({ where: { mentee_user_id: user.id } });
        // incomplete
        if (!matchedMentor) {
            res.status(200).json({ message: "FAILED", mentor: null });
            return;
        }
        const matchedMentorJson = matchedMentor.toJSON();
        const mentor = yield mentor_model_1.default.findOne({
            include: [{
                    model: User_model_1.default,
                    as: 'user',
                    where: { is_active: true }
                }],
            where: { user_id: matchedMentorJson.mentor_user_id }
        });
        if (!mentor) {
            res.status(200).json({ message: "FAILED", mentor: null });
            return;
        }
        // remove degree code and department code and combine their names instead
        const mentorJson = mentor.toJSON();
        const highest_degree_at_nitc = yield (0, getDomainsValues_service_1.getDomainsValues)("degree", mentorJson.highest_degree_at_nitc_code);
        const department = yield (0, getDomainsValues_service_1.getDomainsValues)("department", mentorJson.department_code);
        delete mentorJson.highest_degree_at_nitc_code;
        delete mentorJson.department_code;
        mentorJson.highest_degree_at_nitc = highest_degree_at_nitc;
        mentorJson.department = department;
        console.log("Mentor found:", mentorJson);
        res.status(200).json({ message: "SUCCESS", mentor: mentorJson }); // user info will be inside mentor object
        return;
    }
    catch (error) {
        console.log("Error in getMyMentorController:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.getMyMentorController = getMyMentorController;
