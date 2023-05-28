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
exports.gettotalPrice = exports.deletefromCell = exports.getCellData = exports.cellController = void 0;
const cell_model_1 = __importDefault(require("../../model/cell/cell.model"));
const cellModel = new cell_model_1.default();
const cellController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const str = yield cellModel.roomAtCell(req.body);
        if (str) {
            res.json({
                status: 1,
                message: "Room Already in cell with you"
            });
        }
        else {
            const cell = yield cellModel.addNewRoom(req.body);
            res.json({
                status: 0,
                message: "Cell add correct ",
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.cellController = cellController;
const getCellData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cell = yield cellModel.getAllCell(req.body);
        if (cell == null) {
            res.json({
                status: 1,
                data: cell,
                message: "Not room in the Cell",
            });
        }
        else {
            res.json({
                status: 0,
                data: cell,
                message: "Cell fetch correct ",
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getCellData = getCellData;
const deletefromCell = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cell = yield cellModel.deleteCell(req.body);
        res.json({
            status: 0,
            data: cell,
            message: "data remove correct !",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deletefromCell = deletefromCell;
const gettotalPrice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prices = yield cellModel.getTotalPrice(req.body);
        res.json({
            status: 0,
            data: prices,
            message: "you can pay part of money !",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.gettotalPrice = gettotalPrice;
