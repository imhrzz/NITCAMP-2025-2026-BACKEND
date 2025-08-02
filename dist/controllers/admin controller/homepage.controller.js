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
exports.homepageController = void 0;
const User_model_1 = __importDefault(require("../../models/User.model"));
const mentor_model_1 = __importDefault(require("../../models/mentor.model"));
const mentee_model_1 = __importDefault(require("../../models/mentee.model"));
const matched_users_model_1 = __importDefault(require("../../models/matched_users.model"));
const homepageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.session.user;
    try {
        const noOfUsers = yield User_model_1.default.count({ where: { is_active: true } });
        const noOfMentors = yield mentor_model_1.default.count({
            include: [
                {
                    model: User_model_1.default,
                    as: 'user',
                    where: { is_active: true }
                }
            ]
        });
        const noOfMentees = yield mentee_model_1.default.count({
            include: [
                {
                    model: User_model_1.default,
                    as: 'user',
                    where: { is_active: true }
                }
            ]
        });
        // add no of matched users
        const matchedUsers = yield matched_users_model_1.default.count();
        const unmatchedMentees = noOfMentees - matchedUsers;
        res.status(200).json({
            message: "SUCCESS",
            data: { noOfUsers, noOfMentors, noOfMentees, matchedUsers, unmatchedMentees }
        });
        return;
    }
    catch (error) {
        console.error("Error fetching homepage data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.homepageController = homepageController;
