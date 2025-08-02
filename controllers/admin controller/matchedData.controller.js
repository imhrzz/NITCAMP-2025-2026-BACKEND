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
exports.getMatchedDataController = void 0;
const matched_users_model_1 = __importDefault(require("../../models/matched_users.model"));
const sqllogger_1 = __importDefault(require("../../utility/sqllogger"));
const MODE = process.env.MODE;
const getMatchedDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = req.session.user;
    try {
        const matchedUsers = yield matched_users_model_1.default.findAll({ order: [["createdAt", "DESC"]] });
        if (!matchedUsers || matchedUsers.length == 0) {
            console.log("No users are matched yet");
            res.status(404).json({ error: "No matched users" });
            if (MODE === "production") {
                sqllogger_1.default.error("No users are matched yet");
            }
            return;
        }
        console.log("Fetched matched data:", matchedUsers.map(user => user.toJSON()));
        res.status(200).json({ message: "SUCCESS", matchedUsers });
        if (MODE === "production") {
            sqllogger_1.default.info("Fetched and sent matched users data to the admin", admin === null || admin === void 0 ? void 0 : admin.email);
        }
        return;
    }
    catch (error) {
        console.log("Error in fetching matched users data:", error);
        res.status(500).json({ error: "Internal server error" });
        if (MODE === "production") {
            sqllogger_1.default.error("Error in fetching matched users data", error);
        }
        return;
    }
});
exports.getMatchedDataController = getMatchedDataController;
