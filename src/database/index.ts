import Mysql from 'mysql';
import config from '../config/config';

const pool = Mysql.createPool({
  host: config.post,
  database: config.database,
  user: config.user,
  password: config.password,
  port: parseInt(config.dbPort as string, 10),
});

pool.on('error', (error: Error) => {
  console.error(error.message);
});

export default pool;
