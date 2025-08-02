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
exports.getUnmatchedMentors = void 0;
const mentor_model_1 = __importDefault(require("../models/mentor.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const sequelize_1 = require("sequelize");
const getUnmatchedMentors = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unmatchedMentors = yield mentor_model_1.default.findAll({
            attributes: ['user_id', 'mentee_capacity', 'broad_area_of_expertise', 'narrow_area_of_expertise'],
            include: [
                {
                    model: User_model_1.default,
                    as: 'user', // use the correct alias if defined in association
                    attributes: [],
                    where: { is_active: true }
                },
            ],
            where: { mentee_capacity: { [sequelize_1.Op.gt]: 0 } },
        });
        if (unmatchedMentors.length === 0) {
            return null;
        }
        const unmatchedMentorsJson = unmatchedMentors.map((unmatchedMentor) => unmatchedMentor.toJSON());
        return unmatchedMentorsJson;
    }
    catch (error) {
        throw error;
    }
});
exports.getUnmatchedMentors = getUnmatchedMentors;
