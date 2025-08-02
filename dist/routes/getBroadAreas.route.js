"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getBroadAreas_controller_1 = require("../controllers/getBroadAreas.controller");
const router = (0, express_1.Router)();
router.get("/", getBroadAreas_controller_1.getBroadAreasController);
exports.default = router;
