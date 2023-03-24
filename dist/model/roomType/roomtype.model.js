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
class Roomtype {
    getRoomType() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield index_1.default.connect();
                const sql = 'SELECT * FROM public.room_type';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error('Error while featching data');
            }
        });
    }
}
exports.default = Roomtype;
