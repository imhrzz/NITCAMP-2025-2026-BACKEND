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
const User_model_1 = __importDefault(require("../models/User.model"));
const google_service_1 = require("../services/google.service");
const auth_service_1 = require("../services/auth.service");
const tokengenerator_service_1 = require("../services/tokengenerator.service");
const consts_1 = require("../config/consts");
const sqllogger_1 = __importDefault(require("../utility/sqllogger"));
const MODE = process.env.MODE;
// harsh laudu
const gAuthController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("✅ Google Auth Controller Hit"); // 👈 Add this line
    const { googletoken } = req.body;
    try {
        const payload = yield (0, google_service_1.googleTokenValidation)(googletoken);
        if (!payload) {
            console.log("Invalid Google token payload");
            res.status(401).json({ error: "INVALID GOOGLE TOKEN" });
            if (MODE === "production") {
                sqllogger_1.default.error("User login failed", { error: "Invalid google token" });
            }
            return;
        }
        const { email, name, picture } = payload;
        console.log("Google payload received:", { email, name });
        const existingUser = yield (0, auth_service_1.findUserByEmail)(email);
        function storeSessionData(id, email, role) {
            return __awaiter(this, void 0, void 0, function* () {
                req.session.user = { id, email, role };
                req.session.save(); // Make sure to save the session
                return;
            });
        }
        // 🔹 If user exists
        if (existingUser) {
            const userId = parseInt(existingUser.get("id"));
            const userEmail = existingUser.get("email");
            const userRole = existingUser.get("role");
            console.log("Existing user", { userEmail, userRole });
            if (existingUser.get("is_active") === false) {
                console.log("User has inactivated his account", userEmail);
                const token = (0, tokengenerator_service_1.generateToken)(userId, userEmail, userRole);
                // if his account is inactivated give him option to activate his account, if he does not, clear the cookie and log him out
                res.status(200).cookie("token", token, consts_1.COOKIE_OPTIONS).json({ message: "Account deactivated by the user", user: existingUser.toJSON() }); // fullname , email, is_active, role
                if (MODE === "production") {
                    sqllogger_1.default.warn("Inactive user login", userEmail);
                }
                return;
            }
            // 🔸 If user has no role yet (user logged in but did not fill his details)
            if (userRole === "newuser") {
                console.log("Existing user but no role data");
                storeSessionData(userId, userEmail, userRole);
                res.status(200)
                    .json({
                    message: "SUCCESS",
                    user: existingUser,
                    exist: true,
                    role: userRole,
                });
                if (MODE === "production") {
                    sqllogger_1.default.info("Existing user login with no role", userEmail);
                }
                return;
            }
            // admin login
            if (userRole === "admin") {
                console.log("Admin login");
                storeSessionData(userId, userEmail, userRole);
                res.status(200)
                    .json({
                    message: "SUCCESS",
                    user: existingUser,
                    exist: true,
                    role: userRole,
                });
                if (MODE === "production") {
                    sqllogger_1.default.info("Admin logged in", { userEmail });
                }
                return;
            }
            // 🔸 If user has a role (mentee/mentor)
            const roleData = yield (0, auth_service_1.searchDB)(userId, userRole);
            // when user exists and his role is not found in the database (maybe got deleted somehow) then we set his role in the user table back to "newuser"
            if (!roleData) {
                console.log(`${userRole} data not found, setting his role as newuser`);
                const updatedUser = yield User_model_1.default.update({ role: "newuser" }, { where: { id: userId }, returning: true });
                storeSessionData(userId, userEmail, "newuser");
                res.status(200).json({
                    message: "User login success but role data was not found",
                    user: updatedUser[1][0],
                    exist: true,
                    role: "newuser",
                    roleData: {}
                });
                if (MODE === "production") {
                    sqllogger_1.default.warn("Existing user login with no role data found due to some error", { userEmail, previous_role: userRole, new_role: "newuser" });
                }
                return;
            }
            // ----------------------------------------------------------------------------------------------------
            // existing mentee or mentor login
            storeSessionData(userId, userEmail, userRole);
            res.status(200)
                .json({
                message: "SUCCESS",
                user: existingUser,
                exist: true,
                role: userRole,
                roleData
            });
            if (MODE === "production") {
                sqllogger_1.default.info("Existing user login", { email, userRole });
            }
            return;
        }
        // ----------------------------------------------------------------------------------------------------
        // 🔹 If user does not exist, create a new user
        const newUser = yield (0, auth_service_1.createNewUser)(name, email, picture);
        storeSessionData(newUser.get("id"), email, "newuser");
        res.status(201)
            .json({
            message: "SUCCESS",
            user: newUser,
            exist: false,
            role: "newuser"
        });
        if (MODE === "production") {
            sqllogger_1.default.info("New user login", { email });
        }
        return;
    }
    catch (error) {
        console.log(`Error in google auth: ${error}`);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
        if (MODE === "production") {
            sqllogger_1.default.error("Error in google authentication", error);
        }
        return;
    }
});
exports.default = gAuthController;
