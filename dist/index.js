"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = require("express-rate-limit");
const config_1 = __importDefault(require("./config/config"));
const index_1 = __importDefault(require("./database/index"));
console.log(config_1.default);
const PORT = config_1.default.port || 3000;
// create instant server
const app = (0, express_1.default)();
// Middleware to parse Server
app.use(express_1.default.json());
// HTTP request logged Middleware
app.use((0, morgan_1.default)('common'));
// HTTP security middleware
app.use((0, helmet_1.default)());
// apply the rate limiting middleware to all request
app.use((0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many request from this IP , please try again after one hour',
}));
index_1.default.getConnection(function (err, connection) {
    try {
        connection.query('SELECT NOW()', (err, result) => {
            if (err) {
                return console.log(err);
            }
            else {
                return console.log(result[0]);
            }
        });
        connection.release();
        console.log('m');
    }
    catch (err) {
        connection.release();
    }
});
exports.default = app;
