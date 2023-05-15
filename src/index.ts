import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import config from './config/config';
import database from './database/index';
import routesuser from './routes/api/user.routes';
import routesroomType from './routes/api/roomtype.routes';
import routesroom from './routes/api/room.routes';
import routesBooking from './routes/api/booking.routes';
import routesServices from './routes/api/services.routes';
import errorMiddleware from './middleware/error.middleware';
const PORT = config.port || 3000;
const app: Application = express();
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 60 * 60 * 1000, // one Hour
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many request from this IP , please try again after one hour',
  })
);
// user
app.use('/api', routesuser);
//room type
app.use('/api', routesroomType);
//room 
app.use('/api', routesroom);
//booking
app.use('/api', routesBooking);
// services
app.use('/api', routesServices);
database
  .connect()
  .then(
    (client: {
      query: (arg0: string) => Promise<any>;
      release: () => void;
    }) => {
      return client
        .query('SELECT NOW()')
        .then((res: { rows: any }) => {
          client.release();
          console.log(res.rows);
        })
        .catch((error: { stack: any }) => {
          client.release();
          console.log(error.stack);
        });
    }
  );
app.use(errorMiddleware);
app.use((_req, res) => {
  res.status(404).json({
    message: 'The link is not correct',
  });
});
// start express server
app.listen(PORT, () => {
  console.log(`server is starting at port :${PORT}`);
});
export default app;
