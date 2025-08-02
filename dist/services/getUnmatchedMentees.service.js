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
exports.getUnmatchedMentees = void 0;
const matched_users_model_1 = __importDefault(require("../models/matched_users.model"));
const mentee_model_1 = __importDefault(require("../models/mentee.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const sequelize_1 = require("sequelize");
const getUnmatchedMentees = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matched = yield matched_users_model_1.default.findAll({ attributes: ['mentee_user_id'] });
        const matchedIds = matched.map(m => m.get('mentee_user_id'));
        // Step 2: Query mentees who are NOT in matchedIds
        const unmatchedMentees = yield mentee_model_1.default.findAll({
            attributes: ['user_id', 'broad_area_of_interest', 'narrow_area_of_interest'],
            where: {
                user_id: { [sequelize_1.Op.notIn]: matchedIds.length > 0 ? matchedIds : [0] }
            },
            include: [
                {
                    model: User_model_1.default,
                    as: 'user',
                    attributes: [],
                    where: { is_active: true }
                }
            ],
        });
        if (unmatchedMentees.length === 0) {
            return null;
        }
        const unmatchedMenteesJson = unmatchedMentees.map((unmatchedMentee) => unmatchedMentee.toJSON());
        return unmatchedMenteesJson;
    }
    catch (error) {
        throw error;
    }
});
exports.getUnmatchedMentees = getUnmatchedMentees;
