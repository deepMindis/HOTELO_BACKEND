import { Router } from 'express';
import * as services from '../../controller/services/services';
const routes = Router();
routes.get('/services', services.servicesModelController);
routes.post('/services/addnewServices', services.addNewServices);
routes.get('/services/getMeals', services.getMealsOrder);
routes.get('/services/getSandwichs', services.getSandwichsOrder);
routes.get('/services/getDrinks', services.getdrinksOrder);
export default routes;