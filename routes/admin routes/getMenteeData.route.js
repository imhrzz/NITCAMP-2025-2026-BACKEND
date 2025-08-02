"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getMenteeData_controller_1 = require("../../controllers/admin controller/getMenteeData.controller");
const router = (0, express_1.Router)();
router.get("/:user_id", getMenteeData_controller_1.getMenteeDataController);
exports.default = router;
