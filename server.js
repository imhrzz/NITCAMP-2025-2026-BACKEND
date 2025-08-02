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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./utility/logger"));
// server.ts
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./utility/swagger")); // Adjust path to your swagger.js file
const express_session_1 = __importDefault(require("express-session"));
const session_config_1 = require("./config/session.config");
// Import routes
const gauth_route_1 = __importDefault(require("./routes/gauth.route"));
const updateprofile_route_1 = __importDefault(require("./routes/updateprofile.route"));
const feedback_route_1 = __importDefault(require("./routes/feedback.route"));
const queries_route_1 = __importDefault(require("./routes/queries.route"));
const homepage_route_1 = __importDefault(require("./routes/admin routes/homepage.route"));
const menteeDB_route_1 = __importDefault(require("./routes/admin routes/menteeDB.route"));
const mentorDB_route_1 = __importDefault(require("./routes/admin routes/mentorDB.route"));
const deleteaccount_route_1 = __importDefault(require("./routes/deleteaccount.route"));
const matchedData_route_1 = __importDefault(require("./routes/admin routes/matchedData.route"));
const registerMentee_route_1 = __importDefault(require("./routes/registerMentee.route"));
const registerMentor_route_1 = __importDefault(require("./routes/registerMentor.route"));
const getmenteeinfo_route_1 = __importDefault(require("./routes/getmenteeinfo.route"));
const matchUsers_route_1 = __importDefault(require("./routes/admin routes/matchUsers.route"));
const unmatchedMentees_route_1 = __importDefault(require("./routes/admin routes/unmatchedMentees.route"));
const unmatchedMentors_route_1 = __importDefault(require("./routes/admin routes/unmatchedMentors.route"));
const getMenteeData_route_1 = __importDefault(require("./routes/admin routes/getMenteeData.route"));
const getMentorData_route_1 = __importDefault(require("./routes/admin routes/getMentorData.route"));
const getBroadAreas_route_1 = __importDefault(require("./routes/getBroadAreas.route"));
const getNarrowAreas_route_1 = __importDefault(require("./routes/getNarrowAreas.route"));
const getMyMentor_route_1 = __importDefault(require("./routes/getMyMentor.route"));
const getMyMentees_route_1 = __importDefault(require("./routes/getMyMentees.route"));
const getDomains_route_1 = __importDefault(require("./routes/getDomains.route"));
const logout_route_1 = __importDefault(require("./routes/logout.route"));
const verifysession_route_1 = __importDefault(require("./routes/verifysession.route"));
const sqllogger_1 = __importDefault(require("./utility/sqllogger"));
dotenv_1.default.config();
const MODE = process.env.MODE;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:5431", // Adjust this to your client URL
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Session middleware - MUST be before routes that use sessions
app.use((0, express_session_1.default)(session_config_1.sessionConfig));
// Basic route
app.get('/', (req, res) => {
    res.send("Server is running");
});
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use("/api/googleauth", gauth_route_1.default); // login
app.use("/api/logout", logout_route_1.default); // logout
app.use("/api/verify-session", verifysession_route_1.default);
app.use("/api/menteeinitialinfo", getmenteeinfo_route_1.default);
app.use("/api/register/mentee", registerMentee_route_1.default);
app.use("/api/register/mentor", registerMentor_route_1.default);
app.use("/api/updateprofile", updateprofile_route_1.default);
app.use("/api/getmymentors", getMyMentor_route_1.default);
app.use("/api/getmymentees", getMyMentees_route_1.default);
// app.use("/api/holdmyaccount", holdAccountRouter);  // to set user as inactive and then log him out 
// app.use("/api/activatemyaccount", activateAccountRouter); // to set user as active and then log him out 
app.use("/api/deletemyaccount", deleteaccount_route_1.default);
app.use("/api/feedback", feedback_route_1.default);
app.use("/api/queries", queries_route_1.default);
// admin routes
app.use("/api/admin/homepage", homepage_route_1.default);
app.use("/api/admin/menteedb", menteeDB_route_1.default);
app.use("/api/admin/mentordb", mentorDB_route_1.default);
app.use("/api/admin/getmatchedusers", matchedData_route_1.default);
app.use("/api/admin/getunmatchedmentees", unmatchedMentees_route_1.default);
app.use("/api/admin/getunmatchedmentors", unmatchedMentors_route_1.default); // whose mentee_capacity is greater than 0
app.use("/api/admin/matchusers", matchUsers_route_1.default);
// no authorization required routes   
app.use("/api/getdomains", getDomains_route_1.default);
app.use("/api/getbroadareas", getBroadAreas_route_1.default);
app.use("/api/getnarrowareas", getNarrowAreas_route_1.default);
app.use("/api/getmenteedata", getMenteeData_route_1.default); // to get a specific mentee data using user_id
app.use("/api/getmentordata", getMentorData_route_1.default); // to get a specific mentor data using user_id
db_1.default.sync({ alter: true })
    .then(() => {
    logger_1.default.info("All models synced");
    if (MODE === "production") {
        sqllogger_1.default.info("All models synced");
    }
}).catch((error) => {
    logger_1.default.error(`Sync Failed: ${error}`);
    if (MODE === "production") {
        sqllogger_1.default.error("Models sync failed", error);
    }
});
// Start server
const PORT = 3001;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Server is running on port ${PORT}`);
    if (MODE === "production") {
        sqllogger_1.default.info("Server started at port", PORT);
    }
    try {
        yield db_1.default.authenticate();
        logger_1.default.info("Database connected successfully");
        if (MODE === "production") {
            sqllogger_1.default.info("Database connected successfully");
        }
    }
    catch (error) {
        logger_1.default.error(`Database connection failed: ${error}`);
        if (MODE === "production") {
            sqllogger_1.default.error("Database connection failed", error);
        }
    }
}));
