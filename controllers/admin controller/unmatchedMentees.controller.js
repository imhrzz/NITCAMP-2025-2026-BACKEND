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
Object.defineProperty(exports, "__esModule", { value: true });
exports.unmatchedMenteesController = void 0;
const getUnmatchedMentees_service_1 = require("../../services/getUnmatchedMentees.service");
const unmatchedMenteesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unmatchedMentees = yield (0, getUnmatchedMentees_service_1.getUnmatchedMentees)();
        if (unmatchedMentees === null) {
            res.status(404).json({ error: "No unmatched mentees found" });
            return;
        }
        res.status(200).json({ message: "SUCCESS", unmatchedMentees });
        return;
    }
    catch (error) {
        console.error("Error in unmatchedMenteesController:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.unmatchedMenteesController = unmatchedMenteesController;
