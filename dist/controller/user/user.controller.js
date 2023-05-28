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
exports.authenticated = exports.forgetPasswordcontroller = exports.getUser = exports.updetUserData = exports.register = void 0;
const user_model_1 = __importDefault(require("../../model/user/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const userModel = new user_model_1.default();
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const superfund = yield userModel.getusers(req.body);
        if (superfund) {
            res.json({
                status: 1,
                message: 'the user is already exist',
            });
        }
        else {
            const user = yield userModel.createUser(req.body);
            res.json({
                status: 0,
                data: Object.assign({}, user),
                message: 'user created successfully',
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const updetUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield userModel.getusers(req.body);
        if (check) {
            res.json({
                status: 1,
                message: "The email is already exist",
            });
        }
        else {
            const updataData = yield userModel.updateUser(req.body);
            res.json({
                status: 0,
                data: Object.assign({}, updataData),
                message: "Update data Successfuly"
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updetUserData = updetUserData;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.getusers(req.body);
        res.json({
            status: 0,
            data: Object.assign({}, user),
            message: 'user is exist',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
const forgetPasswordcontroller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const superfund = yield userModel.getusers(req.body);
        if (superfund) {
            const user = yield userModel.forgetPassword(req.body);
            res.json({
                status: 0,
                data: Object.assign({}, user),
                message: 'the code is set for your account',
            });
        }
        else {
            res.json({
                status: 1,
                message: `the nothing email like that ${req.body.email}`,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.forgetPasswordcontroller = forgetPasswordcontroller;
const authenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel.authenticate(email, password);
        const token = jsonwebtoken_1.default.sign({ user }, config_1.default.token);
        if (!user) {
            return res.status(401).json({
                status: 1,
                message: 'the email or password do not match please try again',
            });
        }
        return res.header('Access-Control-Allow-Origin', req.headers.origin).json({
            status: 0,
            data: Object.assign(Object.assign({}, user), { token }),
            message: 'user authenticated successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.authenticated = authenticated;
