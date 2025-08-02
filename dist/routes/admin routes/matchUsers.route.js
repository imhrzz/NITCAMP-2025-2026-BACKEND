"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const matchUsers_controller_1 = require("../../controllers/admin controller/matchUsers.controller");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.requireAuth, (0, auth_middleware_1.requireRole)(["admin"]), matchUsers_controller_1.matchUsersController);
exports.default = router;
