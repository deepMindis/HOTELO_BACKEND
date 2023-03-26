import { Router } from 'express';
import userRouter from './api/user.routes';
import roomTypeRouter from './api/roomtype.routes';
import roomRouter from './api/room.routes';


const routes = Router();


// user
routes.use('/', userRouter);
//room type
routes.use('/', roomTypeRouter)
//room 
routes.use('/', roomRouter)

export default routes;
