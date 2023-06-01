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
exports.searchRoom = exports.getAllRooms = exports.getRoomsByID = void 0;
const room_model_1 = __importDefault(require("../../model/room/room.model"));
const roomModel = new room_model_1.default();
const getRoomsByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield roomModel.getRooms(req.body);
        res.json({
            status: 0,
            data: room,
            message: "data fetch correct"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getRoomsByID = getRoomsByID;
const getAllRooms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield roomModel.getAllRooms();
        res.json({
            status: 0,
            data: rooms,
            message: "You get All Rooms"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllRooms = getAllRooms;
const searchRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield roomModel.serachRoom(req.body);
        res.json({
            status: 0,
            data: rooms,
            message: "You get All Rooms"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.searchRoom = searchRoom;
