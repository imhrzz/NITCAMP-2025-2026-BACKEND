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
exports.getMentorDataController = void 0;
const User_model_1 = __importDefault(require("../../models/User.model"));
const mentor_model_1 = __importDefault(require("../../models/mentor.model"));
const domains_model_1 = __importDefault(require("../../models/domains.model"));
const getMentorDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.user_id;
        const user = yield User_model_1.default.findByPk(user_id);
        if (user === null) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const mentor = yield mentor_model_1.default.findOne({ where: { user_id } });
        if (mentor === null) {
            res.status(404).json({ error: "No mentor data found" });
            return;
        }
        const mentorJson = mentor.toJSON();
        const branchObj = yield domains_model_1.default.findOne({ where: { domain_name: "department", code: mentorJson.department_code } });
        const degreeObj = yield domains_model_1.default.findOne({ where: { domain_name: "degree", code: mentorJson.highest_degree_at_nitc_code } });
        const branchName = branchObj ? branchObj.get("value") : "unknown";
        const degreeName = degreeObj ? degreeObj.get("value") : "unknown";
        delete mentorJson.highest_degree_at_nitc_code;
        delete mentorJson.department_code;
        const mentorData = Object.assign(Object.assign({}, mentorJson), { degree: degreeName, department: branchName });
        res.status(200).json({ message: "SUCCESS", user, mentor: mentorData });
        return;
    }
    catch (error) {
        console.error("Error fetching mentor data:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.getMentorDataController = getMentorDataController;
