import { Router } from 'express';
import * as controllers from '../../controller/user/user.controller';
import $ from 'jquery';

const routes = Router();

// users
routes.post('/users/register', controllers.register);
routes.post('/users/authenticated', controllers.authenticated);
routes.post('/users/forgetPassword', controllers.forgetPasswordcontroller);
routes.post('/users/updateData', controllers.updetUserData);
routes.post('/users/loginadmin', controllers.authenticatedAdmin);


export default routes;