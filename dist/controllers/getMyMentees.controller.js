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
exports.getMyMenteesController = void 0;
const matched_users_model_1 = __importDefault(require("../models/matched_users.model"));
const mentee_model_1 = __importDefault(require("../models/mentee.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const getDomainsValues_service_1 = require("../services/getDomainsValues.service");
const MODE = process.env.MODE;
const getMyMenteesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.session.user;
    if (!user) {
        res.status(401).json({ error: "Something went wrong" });
        return;
    }
    try {
        const matchedMentees = yield matched_users_model_1.default.findAll({ where: { mentor_user_id: user.id } });
        if (!matchedMentees) {
            res.status(200).json({ message: "FAILED", mentees: null });
            return;
        }
        const matchedMenteesJson = matchedMentees.map((matchedMentee) => matchedMentee.toJSON());
        const mentees = yield mentee_model_1.default.findAll({
            include: [{
                    model: User_model_1.default,
                    as: 'user',
                    where: { is_active: true }
                }],
            where: { user_id: matchedMenteesJson.map((matchedMentee) => matchedMentee.mentee_user_id) }
        });
        if (!mentees) {
            res.status(200).json({ message: "FAILED", mentees: null });
            return;
        }
        const menteesJson = mentees.map((mentee) => mentee.toJSON());
        for (let mentee of menteesJson) {
            const degree = yield (0, getDomainsValues_service_1.getDomainsValues)("degree", mentee.degree_code);
            const branch = yield (0, getDomainsValues_service_1.getDomainsValues)("department", mentee.branch_code);
            delete mentee.degree_code;
            delete mentee.branch_code;
            mentee.degree = degree;
            mentee.branch = branch;
        }
        console.log("Mentees found:", menteesJson);
        res.status(200).json({ message: "SUCCESS", mentees: menteesJson }); // mentees will be an array of objects in which user info will be inside each object
        return;
    }
    catch (error) {
        console.log("Error in getMyMenteesController:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.getMyMenteesController = getMyMenteesController;
