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
exports.booking = void 0;
const booking_model_1 = __importDefault(require("../../model/booking/booking.model"));
const bookingModel = new booking_model_1.default();
const booking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boking = yield bookingModel.bookingRoom(req.body);
        if (boking) {
            const update = yield bookingModel.updateDat(req.body);
            res.json({
                status: 0,
                data: Object.assign({}, boking),
                message: 'Booking correct !',
            });
        }
        else {
            res.json({
                status: 2,
                data: "something error",
                message: 'Booking correct !',
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.booking = booking;
