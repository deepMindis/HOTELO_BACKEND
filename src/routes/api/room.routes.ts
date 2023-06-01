import { Router } from 'express';

import * as roomsT from '../../controller/room/room.controller';
const routes = Router();
// room
routes.post('/room/getRooms', roomsT.getRoomsByID);
routes.get('/room/getallRooms', roomsT.getAllRooms);
routes.post('/room/searchRoom', roomsT.searchRoom);

export default routes;