import { Router } from 'express';
import * as rooms from '../../controller/roomType/roomtypr.controller';
const routes = Router();
// roomType
routes.get('/roomType/allRoomTypes', rooms.roomTypeRES);
export default routes;