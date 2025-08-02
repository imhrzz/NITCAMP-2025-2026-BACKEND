"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getDomains_controller_1 = require("../controllers/getDomains.controller");
const router = (0, express_1.default)();
router.get("/:domain_name", getDomains_controller_1.getDomainsController);
exports.default = router;
