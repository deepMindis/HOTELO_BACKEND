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
exports.create = void 0;
const user_model_1 = __importDefault(require("../../model/user/user.model"));
const userModel = new user_model_1.default();
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel.getuser(req.body.email, (error, result) => {
            if (error) {
                return res.json({
                    success: 0,
                    message: error,
                });
            }
            if (result) {
                return res.json({
                    success: 0,
                    message: `This user is ${req.body.email} exist`
                });
            }
            else {
                userModel.createUser(req.body, (error, result) => {
                    if (error) {
                        return res.json({
                            success: 0,
                            data: error,
                        });
                    }
                    else {
                        return res.json({
                            success: 1,
                            message: result,
                        });
                    }
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
