"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMentee = void 0;
const validateMentee = (req, res, next) => {
    if (req.user && req.user.role !== "mentee") {
        console.log("Not a mentee", req.user.email);
        res.status(403).json({ error: "Not a mentee" });
        return;
    }
    next();
};
exports.validateMentee = validateMentee;
