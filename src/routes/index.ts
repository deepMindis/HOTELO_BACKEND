import { Router } from 'express';
import userRouter from './api/user.routes';
import roomTypeRouter from './api/roomtype.routes';


const routes = Router();


// user
routes.use('/', userRouter);
//room type
routes.use('/', roomTypeRouter)


export default routes;
