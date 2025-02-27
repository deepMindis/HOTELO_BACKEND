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
exports.servicesrestueantMake = exports.servicesORderMake = exports.getdrinksOrder = exports.getSandwichsOrder = exports.getMealsOrder = exports.addNewServices = exports.servicesModelController = void 0;
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
const addNewServices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addServices = yield services_model.addservices(req.body);
        res.json({
            status: 0,
            data: Object.assign({}, addServices),
            message: "The Servers order Successfuly !",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.addNewServices = addNewServices;
const getMealsOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getmeeals = yield services_model.getMeals();
        res.json({
            status: 0,
            data: getmeeals,
            message: "Successfuly !",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getMealsOrder = getMealsOrder;
const getSandwichsOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getsand = yield services_model.getSandwinch();
        res.json({
            status: 0,
            data: getsand,
            message: "Successfuly !",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getSandwichsOrder = getSandwichsOrder;
const getdrinksOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getderink = yield services_model.getDricks();
        res.json({
            status: 0,
            data: getderink,
            message: "Successfuly !",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getdrinksOrder = getdrinksOrder;
const servicesORderMake = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield services_model.servicesOrder(req.body);
        res.json({
            status: 0,
            data: order,
            message: "The order make  Successfuly !",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.servicesORderMake = servicesORderMake;
const servicesrestueantMake = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderres = yield services_model.makeResturantOrder(req.body);
        res.json({
            status: 0,
            data: orderres,
            message: "The order make  Successfuly !",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.servicesrestueantMake = servicesrestueantMake;
