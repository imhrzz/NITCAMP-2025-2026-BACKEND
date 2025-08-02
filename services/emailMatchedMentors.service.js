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
exports.emailMatchedMentors = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const emailcontent_1 = require("../config/emailcontent");
const sendMail_service_1 = require("./sendMail.service");
const emailMatchedMentors = (matchedUsers) => __awaiter(void 0, void 0, void 0, function* () {
    const mentorIds = matchedUsers.map((matchedUser) => matchedUser.mentor_user_id);
    const uniqueMentorIds = [...new Set(mentorIds)];
    for (let mentorId of uniqueMentorIds) {
        try {
            // get the mentor
            const mentor = yield User_model_1.default.findOne({ where: { id: mentorId } });
            if (!mentor) {
                console.log("Mentor not found");
                continue;
            }
            const mentorEmail = mentor.toJSON().email;
            // get email content
            const emailContent = (0, emailcontent_1.matchedMentorEmail)(mentor.toJSON().fullname);
            // send email
            yield (0, sendMail_service_1.sendMail)(mentorEmail, emailContent.subject, emailContent.text);
        }
        catch (error) {
            console.log(error);
            continue;
        }
    }
    return;
});
exports.emailMatchedMentors = emailMatchedMentors;
