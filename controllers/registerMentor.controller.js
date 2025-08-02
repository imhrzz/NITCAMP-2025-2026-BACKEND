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
exports.mentorController = void 0;
const updateUserRole_service_1 = require("../services/updateUserRole.service");
const mentorRegister_service_1 = require("../services/mentorRegister.service");
const emailcontent_1 = require("../config/emailcontent");
const sendMail_service_1 = require("../services/sendMail.service");
const mentorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.session.user;
    const { role, mentorData } = req.body;
    if (!user || user.role !== "newuser") {
        console.log("Not a newuser");
        res.status(401).json({ error: "Not a new user" });
        return;
    }
    if (role !== "mentor") {
        res.status(401).json({ error: "Wrong api called" });
        return;
    }
    try {
        const newMentor = yield (0, mentorRegister_service_1.createNewMentor)(user.id, mentorData);
        console.log("New mentor added:", newMentor);
        user.role = "mentor";
        const updatedUser = yield (0, updateUserRole_service_1.updateUser)(user, "mentor");
        req.session.user = { id: updatedUser.id, email: updatedUser.email, role: updatedUser.role };
        req.session.save();
        res.status(201).json({ message: "SUCCESS", user: updatedUser, newMentor });
        // send email to the mentor
        process.nextTick(() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log("Sending email");
                const emailContent = (0, emailcontent_1.newMentorRegistered)(updatedUser.fullname);
                yield (0, sendMail_service_1.sendMail)(updatedUser.email, emailContent.subject, emailContent.text);
            }
            catch (error) {
                console.log("Error in sending email to the mentor:", error);
            }
        }));
        return;
    }
    catch (error) {
        console.log("Error in creating mentor:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.mentorController = mentorController;
