import User from '../../types/user.type';
import pool from '../../database/index';
import config from '../../config/config';
import bcrypt from 'bcrypt';
import { OkPacket } from "mysql2"


const hashPasswordbycrypt = (password: string | any) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

class UserModel {
  async createUser(u: User, callback: any) {
    try {
      const sql = `INSERT INTO users(
        ID,firstname, lastname, email, password, confpassword, phone,pertype)
       VALUES (uuid(),?,?,?,?,?,?,?)`;
      pool.query(sql, [u.firstname, u.lastname, u.email, hashPasswordbycrypt(u.password), hashPasswordbycrypt(u.confpassword), u.phone, u.pertype], (err, res) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, res);
        }
      });
    } catch (error) {
      throw new Error('Unable to create new users');
    }
  }
  async getuser(email: string, callback: any) {
    try {
      const sql = 'SELECT * FROM users WHERE email = ?';
      pool.query(sql, [email], (err, res: any) => {
        if (err) {
          return callback(err);
        } else {
          return callback(null, res[0]);
        }
      });
    } catch (error) {
      throw new Error('the user is already exist');
    }
  }
  async authenticated(email: String, password: string, callback: any) {
    try {
      const sql = 'SELECT * FROM users WHERE email=?';
      pool.query(sql, [email], (error: any, result: any) => {
      });
    } catch (error) {
      throw new Error('No email or password are vaild !!');
    }
  }
}

export default UserModel;
