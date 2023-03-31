import { Router } from 'express';
import * as booking from '../../controller/booking/booking.controller';
const routes = Router();
routes.post('/booking/roombooking', booking.booking);
export default routes;