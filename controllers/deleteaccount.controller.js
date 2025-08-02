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
exports.deleteAccountController = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const matched_users_model_1 = __importDefault(require("../models/matched_users.model"));
const mentor_model_1 = __importDefault(require("../models/mentor.model"));
const deleteAccountController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("deleteAccountController called");
    const user = req.session.user;
    console.log("Session user:", user);
    if (!user) {
        console.log("No user found in session");
        res.status(401).json({ error: "something wrong with the token" });
        return;
    }
    try {
        // const tempUser = omit(user.toJSON(), ["id", "createdAt", "updatedAt", "is_active"]);
        // const roleData = await searchDB(userId, user.toJSON().role);
        // if(!roleData){
        //     await Deleted_Account.create({user_info: user.toJSON})
        //     .then(()=>{
        //         console.log("Deleted account save successfully, but no roleDatafound");
        //     }).catch((err)=>{
        //         throw err;
        //     });
        // }
        // else{
        //     const tempRoleData = omit(roleData, ["id", "user_Id", "createdAt", "updatedAt"])
        //     await Deleted_Account.create({user_info: tempUser, role_data: tempRoleData})
        //     .then(()=>{
        //         console.log("account deleted successfully");
        //     }).catch((err)=>{
        //         throw err;
        //     })
        // }
        let matchedData = null;
        console.log("Checking user role for matched data");
        if (user.role === "mentee") {
            console.log("User is a mentee, searching for matched mentor");
            const matchedDataRaw = yield matched_users_model_1.default.findOne({ where: { mentee_user_id: user.id }, attributes: ["mentor_user_id"] });
            if (matchedDataRaw) {
                matchedData = matchedDataRaw.toJSON();
                console.log("Matched mentor found:", matchedData);
            }
            else {
                matchedData = null;
                console.log("No matched mentor found for this mentee");
            }
        }
        console.log("Attempting to delete user with id:", user.id);
        yield User_model_1.default.destroy({ where: { id: user.id } })
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Account deleted successfully");
            res.status(204).json({ message: "SUCCESS" });
            if (matchedData && matchedData.mentor_user_id) {
                console.log("Incrementing mentor's mentee capacity for mentor_user_id:", matchedData.mentor_user_id);
                yield mentor_model_1.default.increment({ mentee_capacity: 1 }, { where: { user_id: matchedData.mentor_user_id } }).then(() => {
                    console.log("Mentor's mentee capacity incremented successfully");
                }).catch((err) => {
                    console.error("Error incrementing mentor's mentee capacity:", err);
                });
            }
            return;
        })).catch((err) => {
            console.error("Error deleting user:", err);
            throw err;
        });
        console.log("deleteAccountController completed successfully");
        return;
    }
    catch (error) {
        console.error("error in deleting the account:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteAccountController = deleteAccountController;
