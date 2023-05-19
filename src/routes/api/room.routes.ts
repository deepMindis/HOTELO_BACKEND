import { Router } from 'express';

import * as roomsT from '../../controller/room/room.controller';
const routes = Router();
// room
routes.post('/room/getRooms', roomsT.getRoomsByID);

export default routes;