import mysql2 from "mysql";
import config from '../config/config';

let pool = mysql2.createPool({
  host: config.post,
  database: config.database,
  user: config.user,
  password: config.password,
  port: parseInt(config.dbPort as string, 10),
});

pool.on('error', (error: Error) => {
  console.log(error.stack);
});


export default pool;
