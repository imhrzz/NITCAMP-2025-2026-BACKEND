"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const registerMentee_controller_1 = require("../controllers/registerMentee.controller");
const express_validator_1 = require("express-validator");
const handleValidation_middleware_1 = require("../middleware/handleValidation.middleware");
const validateIsActive_middleware_1 = require("../middleware/validateIsActive.middleware");
const router = (0, express_1.Router)();
const validdateEmailId = (req, res, next) => {
    if (req.session.user) {
        if (!req.session.user.email.includes("@nitc.ac.in")) {
            res.status(403).json({ error: "Unauthorized Email" });
            return;
        }
        next();
        return; // Add return here to prevent further execution
    }
    res.status(401).json({ error: "Could not fetch email from the token" });
    return;
};
router.post("/", auth_middleware_1.requireAuth, (0, auth_middleware_1.requireRole)(["newuser"]), validdateEmailId, validateIsActive_middleware_1.validateIsActive, [
    (0, express_validator_1.body)("role").isString().notEmpty().withMessage("Role is required"),
    (0, express_validator_1.body)("menteeData").isObject().withMessage("Mentee data is required"),
    (0, express_validator_1.body)("menteeData.personal_email").isEmail().withMessage("Valid email is required"),
    (0, express_validator_1.body)("menteeData.phone_no").isString().notEmpty().withMessage("Phone number is required"),
    (0, express_validator_1.body)('menteeData.broad_area_of_interest')
        .isArray({ min: 1 })
        .withMessage('broad_area_of_interest must be a non-empty array'),
    (0, express_validator_1.body)('menteeData.broad_area_of_interest.*')
        .isString()
        .notEmpty()
        .trim()
        .withMessage('Each element in broad_area_of_interest must be a non-empty string'),
    (0, express_validator_1.body)('menteeData.narrow_area_of_interest')
        .isArray({ min: 1 })
        .withMessage('narrow_area_of_interest must be a non-empty array'),
    (0, express_validator_1.body)('menteeData.narrow_area_of_interest.*')
        .isString()
        .notEmpty()
        .trim()
        .withMessage('Each element in narrow_area_of_interest must be a non-empty string'),
], handleValidation_middleware_1.handleValidation, registerMentee_controller_1.menteeController);
exports.default = router;
