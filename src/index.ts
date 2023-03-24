import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import config from './config/config';
import database from './database/index';
import routes from './routes/api/user.routes';
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
app.use('/api', routes);
database.getConnection(function (err, connection) {
  try {
    connection.query('SELECT NOW()', (err, result) => {
      if (err) {
        return console.log(err);
      } else {
        return console.log(result);
      }
    });

  } catch (err) {
  }
});
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
