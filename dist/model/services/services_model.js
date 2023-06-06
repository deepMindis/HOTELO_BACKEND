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
const database_1 = __importDefault(require("../../database"));
class ServicesModel {
    getServices() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM public.services';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error("Error while Fetching Data");
            }
        });
    }
    addservices(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'INSERT INTO public."order"(user_id, "Service_ID")VALUES ($1, $2) returning *';
                const result = yield connection.query(sql, [
                    o.user_id,
                    o.Service_ID,
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("Error while order services !");
            }
        });
    }
    getMeals() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "SELECT * FROM public.resturant WHERE resturant_type_id = 'b7658996-0643-442e-91b0-0871d85e9dd5';";
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error("Error while order services !");
            }
        });
    }
    getDricks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "SELECT * FROM public.resturant WHERE resturant_type_id = '9e6183fb-f4aa-4f0d-9034-129a505f539f';";
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error("Error while order services !");
            }
        });
    }
    getSandwinch() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "SELECT * FROM public.resturant WHERE resturant_type_id = 'eeefaa80-59f6-4ef7-8e57-2e722bd75c26';";
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error("Error while order services !");
            }
        });
    }
    servicesOrder(o) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const sql = 'INSERT INTO public."order"(user_id, "Service_ID", amount,totalprice) VALUES ($1, $2, $3,$4);';
            const result = yield connection.query(sql, [
                o.user_id,
                o.Service_ID,
                o.amount,
            ]);
            connection.release();
            return result.rows[0];
        });
    }
    makeResturantOrder(r) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const sql = 'INSERT INTO public.order_resturant(user_id, resturant_id, amount, totalprice)VALUES ($1, $2, $3, $4);';
            const result = yield connection.query(sql, [r.user_id, r.resturant_id, r.amount, r.totalprice]);
            connection.release();
            return result.rows[0];
        });
    }
}
exports.default = ServicesModel;
