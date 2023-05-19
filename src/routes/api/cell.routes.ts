import { Router } from 'express';
import * as  cell from '../../controller/cell/cell.controller';

const routes = Router();

routes.post('/cell/addnewCell', cell.cellController);
routes.post('/cell/getAllCell', cell.getCellData);
routes.delete('/cell/deleteFromCell', cell.deletefromCell);
routes.post('/cell/getTotalPrice', cell.gettotalPrice);

export default routes;