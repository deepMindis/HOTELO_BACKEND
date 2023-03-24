import { Router } from 'express';
import * as controllers from '../../controller/user/user.controller';
import * as rooms from '../../controller/roomType/roomtypr.controller';
const routes = Router();

// users
routes.post('/users/register', controllers.register);
routes.post('/users/authenticated', controllers.authenticated);
routes.post('/users/forgetPassword', controllers.forgetPasswordcontroller);

// roomType
routes.get('/roomType/allRoomTypes', rooms.roomTypeRES);

//room
export default routes;
