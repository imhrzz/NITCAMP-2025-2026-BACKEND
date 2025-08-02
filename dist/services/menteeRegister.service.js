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
exports.createNewMentee = void 0;
const mentee_model_1 = __importDefault(require("../models/mentee.model"));
const menteeInitailnfo_service_1 = require("./menteeInitailnfo.service");
const getDomainsValues_service_1 = require("./getDomainsValues.service");
const createNewMentee = (user, menteeData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const extraInfo = (0, menteeInitailnfo_service_1.menteeExtraInfo)(user.email);
        const newMentee = yield mentee_model_1.default.create({
            user_id: user === null || user === void 0 ? void 0 : user.id,
            roll_no: extraInfo.rollNo,
            year_of_admission: extraInfo.yearOfAdd,
            personal_email: menteeData.personal_email,
            phone_no: menteeData.phone_no,
            degree_code: extraInfo.degree_code,
            branch_code: extraInfo.branch_code,
            broad_area_of_interest: menteeData.broad_area_of_interest,
            narrow_area_of_interest: menteeData.narrow_area_of_interest
        });
        const branch = yield (0, getDomainsValues_service_1.getDomainsValues)("department", extraInfo.branch_code);
        const degree = yield (0, getDomainsValues_service_1.getDomainsValues)("degree", extraInfo.degree_code);
        const menteeJson = newMentee.toJSON();
        delete menteeJson.degree_code;
        delete menteeJson.branch_code;
        return Object.assign(Object.assign({}, menteeJson), { degree: degree, branch: branch });
    }
    catch (error) {
        throw error;
    }
});
exports.createNewMentee = createNewMentee;
