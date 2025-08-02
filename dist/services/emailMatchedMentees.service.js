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
exports.emailMatchedMentees = void 0;
const sendMail_service_1 = require("./sendMail.service");
const User_model_1 = __importDefault(require("../models/User.model"));
const emailcontent_1 = require("../config/emailcontent");
const emailMatchedMentees = (matchedUsers) => __awaiter(void 0, void 0, void 0, function* () {
    for (let matchedUser of matchedUsers) {
        try {
            // get the mentee
            const mentee = yield User_model_1.default.findOne({ where: { id: matchedUser.mentee_user_id } });
            if (!mentee) {
                console.log("Mentee not found");
                continue;
            }
            // get the mentor
            const mentor = yield User_model_1.default.findOne({ where: { id: matchedUser.mentor_user_id } });
            if (!mentor) {
                console.log("Mentor not found");
                continue;
            }
            const menteeEmail = mentee.toJSON().email; // mentee email
            const emailContent = (0, emailcontent_1.matchedMenteeEmail)(mentee.toJSON().fullname, mentor.toJSON().fullname); // email content
            yield (0, sendMail_service_1.sendMail)(menteeEmail, emailContent.subject, emailContent.text);
        }
        catch (error) {
            console.log(error);
            continue;
        }
    }
    return;
});
exports.emailMatchedMentees = emailMatchedMentees;
