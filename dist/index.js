"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = require("express-rate-limit");
const config_1 = __importDefault(require("./config/config"));
const index_1 = __importDefault(require("./database/index"));
const user_routes_1 = __importDefault(require("./routes/api/user.routes"));
const roomtype_routes_1 = __importDefault(require("./routes/api/roomtype.routes"));
const room_routes_1 = __importDefault(require("./routes/api/room.routes"));
const booking_routes_1 = __importDefault(require("./routes/api/booking.routes"));
const services_routes_1 = __importDefault(require("./routes/api/services.routes"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const PORT = config_1.default.port || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('common'));
app.use((0, helmet_1.default)());
app.use((0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many request from this IP , please try again after one hour',
}));
// user
app.use('/api', user_routes_1.default);
//room type
app.use('/api', roomtype_routes_1.default);
//room 
app.use('/api', room_routes_1.default);
//booking
app.use('/api', booking_routes_1.default);
// services
app.use('/api', services_routes_1.default);
index_1.default
    .connect()
    .then((client) => {
    return client
        .query('SELECT NOW()')
        .then((res) => {
        client.release();
        console.log(res.rows);
    })
        .catch((error) => {
        client.release();
        console.log(error.stack);
    });
});
app.use(error_middleware_1.default);
app.use((_req, res) => {
    res.status(404).json({
        message: 'The link is not correct',
    });
});
// start express server
app.listen(PORT, () => {
    console.log(`server is starting at port :${PORT}`);
});
exports.default = app;
