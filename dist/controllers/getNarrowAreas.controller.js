"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNarrowAreasController = void 0;
const narrowAreas_model_1 = __importDefault(require("../models/narrowAreas.model"));
const getNarrowAreasController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const narrowAreas = yield narrowAreas_model_1.default.findAll();
        const narrowAreasJson = narrowAreas.map((narrowArea) => narrowArea.toJSON().narrow_area);
        res.status(200).json({ message: "SUCCESS", narrowAreasJson });
    }
    catch (error) {
        console.error("Error in getNarrowAreasController:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getNarrowAreasController = getNarrowAreasController;
