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
exports.createNewMentor = void 0;
const mentor_model_1 = __importDefault(require("../models/mentor.model"));
const createNewMentor = (id, mentorData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMentor = yield mentor_model_1.default.create({
            user_id: id,
            phone_no: mentorData.phone_no,
            year_graduated: mentorData.year_graduated, // in the frontend show this as "yearGraduatedFromNitc"
            highest_degree_at_nitc_code: mentorData.highest_degree_at_nitc_code,
            department_code: mentorData.department_code,
            mentoring_type: mentorData.mentoring_type,
            mentee_capacity: mentorData.mentoring_type === "community-mentoring" ? 1 : mentorData.mentee_capacity,
            broad_area_of_expertise: mentorData.broad_area_of_expertise,
            narrow_area_of_expertise: mentorData.narrow_area_of_expertise,
        });
        return newMentor.toJSON();
    }
    catch (error) {
        throw error;
    }
});
exports.createNewMentor = createNewMentor;
