"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gauth_controller_1 = __importDefault(require("../controllers/gauth.controller"));
const express_validator_1 = require("express-validator");
const handleValidation_middleware_1 = require("../middleware/handleValidation.middleware");
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.body)("googletoken").isString().notEmpty().withMessage("Google token is required")
], handleValidation_middleware_1.handleValidation, gauth_controller_1.default);
exports.default = router;
