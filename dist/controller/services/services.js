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
exports.servicesModelController = void 0;
const services_model_1 = __importDefault(require("../../model/services/services_model"));
const services_model = new services_model_1.default();
const servicesModelController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomType = yield services_model.getServices();
        res.json({
            status: 0,
            data: roomType,
            message: "All Come true",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.servicesModelController = servicesModelController;
