"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerMentor_controller_1 = require("../controllers/registerMentor.controller");
const express_validator_1 = require("express-validator");
const handleValidation_middleware_1 = require("../middleware/handleValidation.middleware");
const validateIsActive_middleware_1 = require("../middleware/validateIsActive.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.requireAuth, (0, auth_middleware_1.requireRole)(["newuser"]), validateIsActive_middleware_1.validateIsActive, [
    (0, express_validator_1.body)("role").isString().notEmpty().withMessage("Role is required"),
    (0, express_validator_1.body)("mentorData").isObject().withMessage("Mentor data is required"),
    (0, express_validator_1.body)("mentorData.phone_no").isString().notEmpty().withMessage("Phone number is required"),
    (0, express_validator_1.body)("mentorData.year_graduated").isInt().withMessage("Year graduated must be a valid year"),
    (0, express_validator_1.body)("mentorData.highest_degree_at_nitc_code").isString().notEmpty().withMessage("Highest degree at NITC is required"),
    (0, express_validator_1.body)("mentorData.department_code").isString().notEmpty().withMessage("Department is required"),
    (0, express_validator_1.body)("mentorData.mentoring_type").isString().isIn(["one-on-one", "community-mentoring"]).withMessage("Mentoring type is required"),
    (0, express_validator_1.body)("mentorData.mentee_capacity").isInt().withMessage("Mentee capacity must be between 1 and 5"),
    (0, express_validator_1.body)('mentorData.broad_area_of_expertise')
        .isArray({ min: 1 })
        .withMessage('broad_area_of_expertise must be a non-empty array'),
    (0, express_validator_1.body)('mentorData.broad_area_of_expertise.*')
        .isString()
        .notEmpty()
        .trim()
        .withMessage('Each element in broad_area_of_expertise must be a non-empty string'),
    (0, express_validator_1.body)('mentorData.narrow_area_of_expertise')
        .isArray({ min: 1 })
        .withMessage('narrow_area_of_expertise must be a non-empty array'),
    (0, express_validator_1.body)('mentorData.narrow_area_of_expertise.*')
        .isString()
        .notEmpty()
        .trim()
        .withMessage('Each element in narrow_area_of_expertise must be a non-empty string'),
], handleValidation_middleware_1.handleValidation, registerMentor_controller_1.mentorController);
exports.default = router;
