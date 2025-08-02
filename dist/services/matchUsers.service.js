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
exports.matchUsers = void 0;
const lodash_1 = require("lodash");
const mentor_model_1 = __importDefault(require("../models/mentor.model"));
function calculateScore(interests, expertise) {
    var score = 0;
    for (let i = 0; i < interests.length; i++) {
        if (expertise.includes(interests[i])) {
            score++;
        }
    }
    return score;
}
function createScoreMatrix(mentees, mentors) {
    const rows = mentees.length;
    const cols = mentors.length;
    const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            var combinedMenteesInterests = mentees[i].broad_area_of_interest.concat(mentees[i].narrow_area_of_interest);
            var combinedMentorExpertise = mentors[j].broad_area_of_expertise.concat(mentors[j].narrow_area_of_expertise);
            matrix[i][j] = calculateScore(combinedMenteesInterests, combinedMentorExpertise);
        }
    }
    return matrix;
}
function findFirstMax(matrix) {
    let max = [0, -1, -1];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] > max[0]) {
                max = [matrix[i][j], i, j];
            }
        }
    }
    return max;
}
function getCommonAreas(menteeAreas, mentorAreas) {
    return menteeAreas.filter((area) => mentorAreas.includes(area));
}
function matchMenteesAndMentors(mentees, mentors, matrix) {
    return __awaiter(this, void 0, void 0, function* () {
        const matchedResults = [];
        while (true) {
            let [score, menteeIdx, mentorIdx] = findFirstMax(matrix);
            if (score === 0)
                break;
            // Mark this mentee as matched (set entire row to -1)
            matrix[menteeIdx].fill(-1);
            // console.log("matrix updated");
            // printMatrix(matrix);
            // Decrease mentor capacity
            mentors[mentorIdx].mentee_capacity -= 1;
            yield mentor_model_1.default.update({ mentee_capacity: mentors[mentorIdx].mentee_capacity }, { where: { user_id: mentors[mentorIdx].user_id } });
            const mentee = mentees[menteeIdx];
            const mentor = mentors[mentorIdx];
            const menteeInterests = mentee.broad_area_of_interest.concat(mentee.narrow_area_of_interest);
            const mentorExpertise = mentor.broad_area_of_expertise.concat(mentor.narrow_area_of_expertise);
            const common_areas = getCommonAreas(menteeInterests, mentorExpertise);
            matchedResults.push({
                mentee_user_id: mentee.user_id,
                mentor_user_id: mentor.user_id,
                common_areas
            });
            // If mentor has no capacity left, mark entire column as -1
            if (mentors[mentorIdx].mentee_capacity <= 0) {
                for (let i = 0; i < matrix.length; i++) {
                    matrix[i][mentorIdx] = -1;
                }
            }
        }
        return matchedResults;
    });
}
const matchUsers = (Mentees, Mentors) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        Mentees = (0, lodash_1.shuffle)(Mentees);
        Mentors = (0, lodash_1.shuffle)(Mentors);
        const matrix = createScoreMatrix(Mentees, Mentors);
        console.log("Matrix created:", matrix);
        const matchedResults = yield matchMenteesAndMentors(Mentees, Mentors, matrix);
        return matchedResults;
    }
    catch (error) {
        throw error;
    }
});
exports.matchUsers = matchUsers;
