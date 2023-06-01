import { Router } from 'express';
import * as services from '../../controller/services/services';
const routes = Router();
routes.get('/services', services.servicesModelController);
routes.post('/services/addnewServices', services.addNewServices);
export default routes;