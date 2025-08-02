"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const deleteaccount_controller_1 = require("../controllers/deleteaccount.controller");
const validateIsActive_middleware_1 = require("../middleware/validateIsActive.middleware");
const router = (0, express_1.Router)();
router.delete("/", auth_middleware_1.requireAuth, (0, auth_middleware_1.requireRole)(["mentee", "mentor"]), validateIsActive_middleware_1.validateIsActive, deleteaccount_controller_1.deleteAccountController);
exports.default = router;
