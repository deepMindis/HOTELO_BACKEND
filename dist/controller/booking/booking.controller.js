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
exports.requestTime = exports.fetchData = exports.booking = void 0;
const booking_model_1 = __importDefault(require("../../model/booking/booking.model"));
const bookingModel = new booking_model_1.default();
const booking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = bookingModel.bookingRoom(req.body);
        res.json({
            status: 0,
            data: Object.assign({}, booking),
            message: "Booking correct !"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.booking = booking;
const fetchData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetch = yield bookingModel.getRoomCell(req.body);
        res.json({
            status: 0,
            data: fetch,
            message: 'correct !',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.fetchData = fetchData;
const requestTime = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requ = yield bookingModel.requestTime(req.body);
        res.json({
            status: 0,
            data: requ,
            message: 'correct !',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.requestTime = requestTime;
