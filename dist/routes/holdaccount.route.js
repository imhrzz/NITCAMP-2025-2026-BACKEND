"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const holdaccount_controller_1 = require("../controllers/holdaccount.controller");
const validateIsActive_middleware_1 = require("../middleware/validateIsActive.middleware");
const router = (0, express_1.Router)();
router.put("/", auth_middleware_1.requireAuth, validateIsActive_middleware_1.validateIsActive, holdaccount_controller_1.holdAccountController);
exports.default = router;
