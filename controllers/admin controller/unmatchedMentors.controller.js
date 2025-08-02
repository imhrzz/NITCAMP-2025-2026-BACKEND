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
exports.unmatchedMentorsController = void 0;
const getUnmatchedMentors_service_1 = require("../../services/getUnmatchedMentors.service");
const unmatchedMentorsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unmatchedMentors = yield (0, getUnmatchedMentors_service_1.getUnmatchedMentors)();
        if (unmatchedMentors === null) {
            res.status(404).json({ error: "No unmatched mentors found" });
            return;
        }
        res.status(200).json({ message: "SUCCESS", unmatchedMentors });
        return;
    }
    catch (error) {
        console.error("Error in unmatchedMentorsController:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.unmatchedMentorsController = unmatchedMentorsController;
