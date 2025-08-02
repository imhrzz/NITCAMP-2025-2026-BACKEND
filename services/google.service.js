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
exports.googleTokenValidation = void 0;
const google_auth_library_1 = require("google-auth-library");
const consts_1 = require("../config/consts");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new google_auth_library_1.OAuth2Client(consts_1.GOOGLE_CLIENT_ID);
// console.log("Google OAuth2 client initialized with client ID:", GOOGLE_CLIENT_ID);
const googleTokenValidation = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.MODE === "testing") {
            const payload = {
                email: "demomentee_b220789ch@nitc.ac.in",
                name: "Demo mentee",
                picture: "https://lh3.googleusercontent.com/a/ACg8ocKC9RGHSQ5zRpo6BuF8jRexEXbdapN-JAWLDzdJ0s67EVwoO8E=s96-c"
            };
            return payload;
        }
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: consts_1.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        if (!payload) {
            return null;
        }
        return {
            email: payload.email,
            name: payload.name,
            picture: payload.picture
        };
    }
    catch (error) {
        throw error;
    }
});
exports.googleTokenValidation = googleTokenValidation;
