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
exports.matchUsersController = void 0;
const getUnmatchedMentees_service_1 = require("../../services/getUnmatchedMentees.service");
const getUnmatchedMentors_service_1 = require("../../services/getUnmatchedMentors.service");
const matchUsers_service_1 = require("../../services/matchUsers.service");
const matched_users_model_1 = __importDefault(require("../../models/matched_users.model"));
const emailMatchedMentees_service_1 = require("../../services/emailMatchedMentees.service");
const emailMatchedMentors_service_1 = require("../../services/emailMatchedMentors.service");
const matchUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menteesArray = yield (0, getUnmatchedMentees_service_1.getUnmatchedMentees)();
        if (menteesArray === null) {
            res.status(404).json({ error: "No mentees found to be matched" });
            return;
        }
        const mentorsArray = yield (0, getUnmatchedMentors_service_1.getUnmatchedMentors)();
        if (mentorsArray === null) {
            res.status(404).json({ error: "No mentors found to be matched" });
            return;
        }
        const matchedUsers = yield (0, matchUsers_service_1.matchUsers)(menteesArray, mentorsArray);
        if (matchedUsers === null) {
            res.status(404).json({ error: "No user matched" });
            return;
        }
        // store matched users in database
        const responseData = [];
        for (const user of matchedUsers) {
            const matchedUser = yield matched_users_model_1.default.create(user);
            responseData.push(matchedUser.toJSON());
        }
        res.status(200).json({ message: "SUCCESS", matchedUsers: responseData });
        // send each user an email
        yield (0, emailMatchedMentees_service_1.emailMatchedMentees)(matchedUsers);
        yield (0, emailMatchedMentors_service_1.emailMatchedMentors)(matchedUsers);
        return;
    }
    catch (error) {
        console.error("Error matching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.matchUsersController = matchUsersController;
