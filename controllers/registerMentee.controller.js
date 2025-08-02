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
exports.menteeController = void 0;
const menteeRegister_service_1 = require("../services/menteeRegister.service");
const emailcontent_1 = require("../config/emailcontent");
const sendMail_service_1 = require("../services/sendMail.service");
const updateUserRole_service_1 = require("../services/updateUserRole.service");
const menteeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.session.user;
    const { role, menteeData } = req.body;
    console.log("Starting menteeController");
    if (role !== "mentee") {
        console.log("Sending 401: Wrong API called");
        res.status(401).json({ error: "Wrong API called" });
        return;
    }
    if (!(user === null || user === void 0 ? void 0 : user.id) || !(user === null || user === void 0 ? void 0 : user.email) || !(user === null || user === void 0 ? void 0 : user.role)) {
        console.log("Sending 400: Invalid token information");
        res.status(400).json({ error: "Invalid token information" });
        return;
    }
    try {
        console.log("Creating new mentee");
        const newMentee = yield (0, menteeRegister_service_1.createNewMentee)(user, menteeData);
        console.log("New mentee added:", newMentee);
        console.log("Updating user role");
        user.role = "mentee";
        const updatedUser = yield (0, updateUserRole_service_1.updateUser)(user, "mentee");
        console.log("Updating session");
        req.session.user = { id: updatedUser.id, email: updatedUser.email, role: updatedUser.role };
        req.session.save();
        console.log("Sending 201: Success response");
        res.status(201).json({ message: "SUCCESS", user: updatedUser, newMentee });
        // Send email in background - completely isolated from main flow
        process.nextTick(() => {
            (() => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    console.log("Sending email");
                    const emailContent = (0, emailcontent_1.newMenteeRegistered)(updatedUser.fullname);
                    yield (0, sendMail_service_1.sendMail)(updatedUser.email, emailContent.subject, emailContent.text);
                    console.log("Email sent successfully");
                }
                catch (error) {
                    console.log("Error in sending email to the mentee:", error);
                }
            }))().catch((error) => {
                console.log("Unhandled error in email sending:", error);
            });
        });
        return;
    }
    catch (error) {
        console.log("Caught error in menteeController:", error);
        if (!res.headersSent) {
            console.log("Sending 500: Internal Server Error");
            res.status(500).json({ error: "Internal Server Error" });
        }
        else {
            console.log("Headers already sent, skipping response");
        }
        return;
    }
});
exports.menteeController = menteeController;
