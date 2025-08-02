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
exports.updateUser = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const updateUser = (user, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield User_model_1.default.update({ role: role }, { where: { id: user.id }, returning: true });
        console.log("User updated:", updatedUser[1][0].toJSON());
        // Check if the update was successful and user was returned
        if (updatedUser[1] && updatedUser[1][0]) {
            const userInstance = updatedUser[1][0];
            // Try toJSON, fallback to dataValues if toJSON doesn't exist
            return userInstance.toJSON ? userInstance.toJSON() : userInstance.dataValues;
        }
        else {
            throw new Error("User update failed - no user returned");
        }
    }
    catch (error) {
        console.error("Error in updateUser service:", error);
        throw error;
    }
});
exports.updateUser = updateUser;
