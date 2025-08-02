"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionConfig = void 0;
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PgSession = (0, connect_pg_simple_1.default)(express_session_1.default);
// Create a separate pg pool for sessions
const DATABASE_MODE = process.env.DATABASE_MODE;
const DATABASE_URL = DATABASE_MODE === "supabase" ? process.env.SUPABASE_URL : process.env.LOCAL_DATABASE_URL;
const pool = new pg_1.Pool({
    connectionString: DATABASE_URL,
});
exports.sessionConfig = {
    store: new PgSession({
        pool: pool,
        tableName: "sessions",
        createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET || "session",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    },
};
exports.default = exports.sessionConfig;
