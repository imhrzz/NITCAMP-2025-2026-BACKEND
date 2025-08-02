"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const unhold_controller_1 = require("../controllers/unhold.controller");
const router = (0, express_1.Router)();
router.put("/", auth_middleware_1.requireAuth, unhold_controller_1.unholdAccountController);
exports.default = router;
