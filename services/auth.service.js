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
exports.createNewUser = exports.searchDB = exports.findUserByEmail = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const mentee_model_1 = __importDefault(require("../models/mentee.model"));
const mentor_model_1 = __importDefault(require("../models/mentor.model"));
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_model_1.default.findOne({ where: { email } });
});
exports.findUserByEmail = findUserByEmail;
const searchDB = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    switch (role) {
        case "mentee":
            const mentee = yield mentee_model_1.default.findOne({
                where: { user_id: userId }
            });
            if (!mentee) {
                return { roleData: null };
            }
            const menteeData = mentee.toJSON();
            // Manually fetch branch and degree information
            return { roleData: menteeData };
            break;
        case "mentor":
            const mentor = yield mentor_model_1.default.findOne({ where: { user_id: userId } });
            if (mentor)
                return { roleData: mentor.toJSON() };
            else
                return { roleData: null };
            break;
        default:
            console.log("Unknown role:", role);
    }
    return { roleData: {} };
});
exports.searchDB = searchDB;
const createNewUser = (fullname, email, photo) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield User_model_1.default.create({
        fullname,
        email,
        photo_url: photo
    });
    return newUser;
});
exports.createNewUser = createNewUser;
