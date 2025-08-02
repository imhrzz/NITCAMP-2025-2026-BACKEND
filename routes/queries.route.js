"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const queries_controller_1 = require("../controllers/queries.controller");
const validation_chain_builders_1 = require("express-validator/lib/middlewares/validation-chain-builders");
const handleValidation_middleware_1 = require("../middleware/handleValidation.middleware");
const validateIsActive_middleware_1 = require("../middleware/validateIsActive.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.requireAuth, (0, auth_middleware_1.requireRole)(["mentee", "mentor"]), validateIsActive_middleware_1.validateIsActive, [
    (0, validation_chain_builders_1.body)("content").isString().notEmpty().withMessage("Query is required"),
    (0, validation_chain_builders_1.body)("content").isLength({ max: 500 }).withMessage("Query must be at most 500 characters long")
], handleValidation_middleware_1.handleValidation, queries_controller_1.queriesController);
exports.default = router;
