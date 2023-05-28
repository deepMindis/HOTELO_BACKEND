import User from '../../types/user.type';
import pool from '../../database/index';
import config from '../../config/config';
import bcrypt from 'bcrypt';

const hashPasswordbycrypt = (password: string | any) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

class UserModel {
  async createUser(u: User): Promise<User> {
    try {
      // open connection
      const connection = await pool.connect();
      const sql = `INSERT INTO public.users(firstname, lastname, email, password, phone)
          VALUES ($1,$2, $3, $4,  $5) returning *`;
      // run query
      const result = await connection.query(sql, [
        u.firstname,
        u.lastname,
        u.email,
        hashPasswordbycrypt(u.password),
        u.phone,
      ]);
      //release connection
      connection.release();
      //return created users
      return result.rows[0];
    } catch (error) {
      throw new Error('Unable to create new user');
    }
  }
  async getusers(u: User): Promise<User | null> {
    try {
      const connection = await pool.connect();
      const sql = 'SELECT * FROM public.users WHERE email = $1';
      const result = await connection.query(sql, [u.email]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error('the user is already exist');
    }
  }
  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const connection = await pool.connect();
      const sql = 'SELECT * FROM users WHERE email = $1';
      const result = await connection.query(sql, [email]);
      if (result.rows.length) {
        const { password: hashPasswordbycrypt } = result.rows[0];
        const isPasswordVaild = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPasswordbycrypt
        );
        if (isPasswordVaild) {
          const userInfo = await connection.query(
            'SELECT * FROM public.users WHERE email = $1',
            [email]
          );
          return userInfo.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error('No email or password are vaild !!');
    }
  }
  async forgetPassword(u: User): Promise<User | null> {
    try {
      const array = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 10)
      );
      let number = array.join('');
      const connection = await pool.connect();
      const sql = 'SELECT * FROM users WHERE email = $1';
      const result = await connection.query(sql, [u.email]);
      if (result.rows.length) {
        const action = `UPDATE public.users SET code =${number}  WHERE email = $1 returning code`;
        const resultaction = await connection.query(action, [u.email]);
        return resultaction.rows[0];
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error('the error happen while send data to email');
    }
  }

  async updateUser(u: User): Promise<User> {
    try {
      const connection = await pool.connect();
      const sql = 'UPDATE public.users SET firstname=$1, lastname=$2, email=$3, phone=$4 WHERE id = $5 returning * ';
      const result = await connection.query(sql, [u.firstname, u.lastname, u.email, u.phone, u.id,]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("You have an error while updating data !!");
    }
  }
}

export default UserModel;
