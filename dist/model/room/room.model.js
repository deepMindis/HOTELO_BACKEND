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
class RoomModel {
    getRooms(r) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = 'SELECT * FROM PUBLIC.room WHERE roomtypeid = $1 AND roomstate = 0';
                const result = yield connection.query(sql, [r.roomtypeID]);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error('Error while featching data');
            }
        });
    }
    getAllRooms() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = 'SELECT nameroom , roomnumber,petfrindly,roomcoast,roomstate,room.photo,smokefrindly from public.room_type, public.room WHERE room.roomtypeid = room_type.id';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error('Error while Fetching Data !');
            }
        });
    }
    serachRoom(r) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = "SELECT nameroom , roomnumber,petfrindly,roomcoast,roomstate,room.photo,smokefrindly from public.room_type, public.room WHERE room.roomnumber::VARCHAR LIKE $%1%;";
                const result = yield connection.query(sql, [r.value]);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error('Error while featching data');
            }
        });
    }
}
exports.default = RoomModel;
