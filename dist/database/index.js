"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const config_1 = __importDefault(require("../config/config"));
let pool = mysql_1.default.createPool({
    host: config_1.default.post,
    database: config_1.default.database,
    user: config_1.default.user,
    password: config_1.default.password,
    port: parseInt(config_1.default.dbPort, 10),
});
pool.on('error', (error) => {
    console.log(error.stack);
});
exports.default = pool;
