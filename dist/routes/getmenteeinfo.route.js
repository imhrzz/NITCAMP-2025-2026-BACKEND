"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const getmenteeinfo_controller_1 = require("../controllers/getmenteeinfo.controller");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.requireAuth, getmenteeinfo_controller_1.getMenteeExtraInfoController);
exports.default = router;
