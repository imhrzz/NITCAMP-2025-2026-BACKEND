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
exports.getMenteeDataController = void 0;
const User_model_1 = __importDefault(require("../../models/User.model"));
const mentee_model_1 = __importDefault(require("../../models/mentee.model"));
const getDomainsValues_service_1 = require("../../services/getDomainsValues.service");
const getMenteeDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.user_id;
        const user = yield User_model_1.default.findByPk(user_id);
        if (user === null) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const mentee = yield mentee_model_1.default.findOne({ where: { user_id } });
        if (mentee === null) {
            res.status(404).json({ error: "No mentee data found" });
            return;
        }
        const menteeJson = mentee.toJSON();
        const degree = yield (0, getDomainsValues_service_1.getDomainsValues)("degree", menteeJson.degree_code);
        const branch = yield (0, getDomainsValues_service_1.getDomainsValues)("department", menteeJson.branch_code);
        delete menteeJson.degree_code;
        delete menteeJson.branch_code;
        menteeJson.degree = degree;
        menteeJson.branch = branch;
        res.status(200).json({ message: "SUCCESS", user, mentee: menteeJson });
        return;
    }
    catch (error) {
        console.error("Error fetching mentee data:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.getMenteeDataController = getMenteeDataController;
