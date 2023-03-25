import { Router } from 'express';
import * as controllers from '../../controller/user/user.controller';

const routes = Router();

// users
routes.post('/users/register', controllers.register);
routes.post('/users/authenticated', controllers.authenticated);
routes.post('/users/forgetPassword', controllers.forgetPasswordcontroller);


export default routes;
