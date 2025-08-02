"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getMentorData_controller_1 = require("../../controllers/admin controller/getMentorData.controller");
const router = (0, express_1.Router)();
router.get("/:user_id", getMentorData_controller_1.getMentorDataController);
exports.default = router;
