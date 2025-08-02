"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const homepage_controller_1 = require("../../controllers/admin controller/homepage.controller");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.requireAuth, (0, auth_middleware_1.requireRole)(["admin"]), homepage_controller_1.homepageController);
exports.default = router;
