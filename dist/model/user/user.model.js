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
    createUser(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // open connection
                const connection = yield index_1.default.connect();
                const sql = `INSERT INTO public.users(firstname, lastname, email, password, phone,roles)
          VALUES ($1,$2, $3, $4,  $5,$6) returning *`;
                // run query
                const result = yield connection.query(sql, [
                    u.firstname,
                    u.lastname,
                    u.email,
                    hashPasswordbycrypt(u.password),
                    u.phone,
                    u.roles,
                ]);
                //release connection
                connection.release();
                //return created users
                return result.rows[0];
            }
            catch (error) {
                throw new Error('Unable to create new user');
            }
        });
    }
    getusers(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = 'SELECT * FROM public.users WHERE email = $1';
                const result = yield connection.query(sql, [u.email]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error('the user is already exist');
            }
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = 'SELECT * FROM users WHERE email = $1';
                const result = yield connection.query(sql, [email]);
                if (result.rows.length) {
                    const { password: hashPasswordbycrypt } = result.rows[0];
                    const isPasswordVaild = bcrypt_1.default.compareSync(`${password}${config_1.default.pepper}`, hashPasswordbycrypt);
                    if (isPasswordVaild) {
                        const userInfo = yield connection.query('SELECT * FROM public.users WHERE email = $1', [email]);
                        return userInfo.rows[0];
                    }
                }
                connection.release();
                return null;
            }
            catch (error) {
                throw new Error('No email or password are vaild !!');
            }
        });
    }
    authenticateadmin(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = 'SELECT * FROM users WHERE email = $1 AND roles = 1';
                const result = yield connection.query(sql, [u.email]);
                if (result.rows.length) {
                    const { password: hashPasswordbycrypt } = result.rows[0];
                    const isPasswordVaild = bcrypt_1.default.compareSync(`${u.password}${config_1.default.pepper}`, hashPasswordbycrypt);
                    if (isPasswordVaild) {
                        const userInfo = yield connection.query('SELECT * FROM public.users WHERE email = $1 AND roles = 1', [u.email]);
                        return userInfo.rows[0];
                    }
                }
                connection.release();
                return null;
            }
            catch (error) {
                throw new Error('No email or password are vaild !!');
            }
        });
    }
    forgetPassword(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const array = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10));
                let number = array.join('');
                const connection = yield index_1.default.connect();
                const sql = 'SELECT * FROM users WHERE email = $1';
                const result = yield connection.query(sql, [u.email]);
                if (result.rows.length) {
                    const action = `UPDATE public.users SET code =${number}  WHERE email = $1 returning code`;
                    const resultaction = yield connection.query(action, [u.email]);
                    return resultaction.rows[0];
                }
                connection.release();
                return null;
            }
            catch (error) {
                throw new Error('the error happen while send data to email');
            }
        });
    }
    updateUser(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = 'UPDATE public.users SET firstname=$1, lastname=$2, email=$3, phone=$4 WHERE id = $5 returning * ';
                const result = yield connection.query(sql, [u.firstname, u.lastname, u.email, u.phone, u.id,]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("You have an error while updating data !!");
            }
        });
    }
}
exports.default = UserModel;
