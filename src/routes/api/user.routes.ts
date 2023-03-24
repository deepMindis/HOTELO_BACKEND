import { Router } from 'express';
import * as controllers from '../../controller/user/user.controller';
import authenticatedmidddleware from '../../middleware/authenticate.middleware';

const routes = Router();

// register new user
routes.post('/users/register', controllers.create);
// auth users

export default routes;
