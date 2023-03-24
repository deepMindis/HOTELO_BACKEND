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
const index_1 = __importDefault(require("../../database/index"));
const config_1 = __importDefault(require("../../config/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPasswordbycrypt = (password) => {
    const salt = parseInt(config_1.default.salt, 10);
    return bcrypt_1.default.hashSync(`${password}${config_1.default.pepper}`, salt);
};
class UserModel {
    createUser(u, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO users(
        ID,firstname, lastname, email, password, confpassword, phone,pertype)
       VALUES (uuid(),?,?,?,?,?,?,?)`;
                index_1.default.query(sql, [u.firstname, u.lastname, u.email, hashPasswordbycrypt(u.password), hashPasswordbycrypt(u.confpassword), u.phone, u.pertype], (err, res) => {
                    if (err) {
                        return callback(err);
                    }
                    else {
                        return callback(null, res);
                    }
                });
            }
            catch (error) {
                throw new Error('Unable to create new users');
            }
        });
    }
    getuser(email, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE email = ?';
                index_1.default.query(sql, [email], (err, res) => {
                    if (err) {
                        return callback(err);
                    }
                    else {
                        return callback(null, res[0]);
                    }
                });
            }
            catch (error) {
                throw new Error('the user is already exist');
            }
        });
    }
}
exports.default = UserModel;
