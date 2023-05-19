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
class Cell {
    addNewRoom(c) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `INSERT INTO public.cell(user_id, room_id) VALUES($1, $2) returning *`;
                const result = yield connection.query(sql, [
                    c.user_id,
                    c.room_id,
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error('Error while insert new Data');
            }
        });
    }
    getAllCell(r) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = 'SELECT * FROM public.room INNER JOIN public.cell ON public.cell.room_id = public.room.id WHERE public.cell.user_id = $1 AND public.cell.status = 0';
                const result = yield connection.query(sql, [r.user_id]);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error('Error while featching data');
            }
        });
    }
    deleteCell(r) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = 'DELETE FROM public.cell WHERE public.cell.id = $1';
                const result = yield connection.query(sql, [r.id]);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error('Error while remove from cell');
            }
        });
    }
    getTotalPrice(r) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `SELECT SUM(roomcoast) as Total FROM public.room INNER JOIN public.cell ON public.cell.room_id = public.room.id WHERE public.cell.user_id = $1`;
                const result = yield connection.query(sql, [r.user_id]);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error("Error while fetching data !");
            }
        });
    }
}
exports.default = Cell;
