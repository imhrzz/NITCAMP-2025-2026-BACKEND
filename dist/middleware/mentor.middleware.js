"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMentor = void 0;
const validateMentor = (req, res, next) => {
    if (req.user && req.user.role !== "mentor") {
        console.log("Not a mentor", req.user.email);
        res.status(403).json({ error: "Not a mentor" });
        return;
    }
    next();
};
exports.validateMentor = validateMentor;
