"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchedMentorEmail = exports.matchedMenteeEmail = exports.newMentorRegistered = exports.newMenteeRegistered = void 0;
const newMenteeRegistered = (name) => {
    return {
        subject: "Your account has been registered for NITCamp mentoring program",
        text: `Hello ${name},\n\nYour account has been registered for NITCamp mentoring program. We will get back to you soon when we have matched you with a mentor.\n\nThank you for using our service.\n\nBest regards,\nNITCamp Team`
    };
};
exports.newMenteeRegistered = newMenteeRegistered;
const newMentorRegistered = (name) => {
    return {
        subject: "Your account has been registered for NITCamp mentoring program",
        text: `Hello ${name},\n\nYour account has been registered for NITCamp mentoring program. We will get back to you soon when we have matched you with your mentees.\n\nThank you for using our service.\n\nBest regards,\nNITCamp Team`
    };
};
exports.newMentorRegistered = newMentorRegistered;
const matchedMenteeEmail = (name, mentorName) => {
    return {
        subject: "You have been matched with a mentor",
        text: `Hello ${name},\n\nYou have been matched with a mentor ${mentorName} please check your dashboard for more details.\n\nThank you for using our service.\n\nBest regards,\nNITCamp Team`
    };
};
exports.matchedMenteeEmail = matchedMenteeEmail;
const matchedMentorEmail = (name) => {
    return {
        subject: "You have been matched with a mentee",
        text: `Hello ${name},\n\nYou have been matched with your mentees please check your dashboard for more details.\n\nThank you for using our service.\n\nBest regards,\nNITCamp Team`
    };
};
exports.matchedMentorEmail = matchedMentorEmail;
