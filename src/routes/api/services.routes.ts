import { Router } from 'express';
import * as services from '../../controller/services/services';
const routes = Router();
routes.get('/services', services.servicesModelController);
export default routes;