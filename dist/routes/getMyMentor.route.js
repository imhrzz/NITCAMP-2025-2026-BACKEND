"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validateIsActive_middleware_1 = require("../middleware/validateIsActive.middleware");
const getMyMentor_controller_1 = require("../controllers/getMyMentor.controller");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.requireAuth, (0, auth_middleware_1.requireRole)(["mentee"]), validateIsActive_middleware_1.validateIsActive, getMyMentor_controller_1.getMyMentorController);
exports.default = router;
