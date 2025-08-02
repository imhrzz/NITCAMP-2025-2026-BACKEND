"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/verify-session.route.ts
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    if (!req.session.user) {
        res.status(401).json({ error: "Unauthorized: No active session" });
        return;
    }
    res.status(200).json({ message: "Session valid", user: req.session.user });
    return;
});
exports.default = router;
