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
class BookingRoom {
    bookingRoom(b) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `INSERT INTO public.booking( bookingcheckin, bookingcheckout, total, numberadult, numberchild, paymenttype, userID) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`;
                const result = yield connection.query(sql, [
                    b.bookingcheckin,
                    b.bookingcheckout,
                    b.total,
                    b.numberadult,
                    b.numberchild,
                    b.paymenttype,
                    b.userID,
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error('Error while booking please try again !!');
            }
        });
    }
    updateDataCell(b) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `UPDATE public.cell SET  status = 1 WHERE public.cell.user_id = $1`;
                const result = yield connection.query(sql, [b.userID]);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error("Data not update correct");
            }
        });
    }
    getRoomCell(b) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = `SELECT public.cell.room_id FROM public.cell WHERE public.cell.user_id = $1`;
                const result = yield connection.query(sql, [b.userID]);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error("Error while Fetching Data");
            }
        });
    }
}
exports.default = BookingRoom;
