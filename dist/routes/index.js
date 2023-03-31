"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./api/user.routes"));
const roomtype_routes_1 = __importDefault(require("./api/roomtype.routes"));
const room_routes_1 = __importDefault(require("./api/room.routes"));
const booking_routes_1 = __importDefault(require("./api/booking.routes"));
const routes = (0, express_1.Router)();
// user
routes.use('/', user_routes_1.default);
//room type
routes.use('/', roomtype_routes_1.default);
//room 
routes.use('/', room_routes_1.default);
//booking
routes.use('/', booking_routes_1.default);
exports.default = routes;
