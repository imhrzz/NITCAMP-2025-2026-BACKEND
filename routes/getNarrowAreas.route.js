"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getNarrowAreas_controller_1 = require("../controllers/getNarrowAreas.controller");
const router = (0, express_1.Router)();
router.get("/", getNarrowAreas_controller_1.getNarrowAreasController);
exports.default = router;
