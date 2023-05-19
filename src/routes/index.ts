import { Router } from 'express';
import userRouter from './api/user.routes';
import roomTypeRouter from './api/roomtype.routes';
import roomRouter from './api/room.routes';
import bookingRouter from './api/booking.routes';
import servicrsRoute from './api/services.routes';
import cellRoute from './api/cell.routes';


const routes = Router();


// user
routes.use('/', userRouter);
//room type
routes.use('/', roomTypeRouter);
//room 
routes.use('/', roomRouter);
//booking
routes.use('/', bookingRouter);
// services
routes.use('/', servicrsRoute);
// Cell
routes.use('/', cellRoute);

export default routes;
