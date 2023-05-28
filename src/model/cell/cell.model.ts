import cell from '../../types/cell.types';
import pool from '../../database/index';
import room from '../../types/room.types';

class Cell {
    async addNewRoom(c: cell): Promise<cell> {
        try {
            const connection = await pool.connect();
            const sql = `INSERT INTO public.cell(user_id, room_id) VALUES($1, $2)  returning *`;
            const result = await connection.query(sql, [
                c.user_id,
                c.room_id,
            ]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error('Error while insert new Data');
        }
    }
    async roomAtCell(r: cell): Promise<cell | null> {
        try {
            const connection = await pool.connect();
            const sql = "SELECT * FROM PUBLIC.cell WHERE public.cell.user_id = $1 AND public.cell.room_id = $2";
            const result = await connection.query(sql, [r.user_id, r.room_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error('The room already Booking !!');
        }
    }
    async getAllCell(r: room): Promise<room[] | null> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM public.room INNER JOIN public.cell ON public.cell.room_id = public.room.id WHERE public.cell.user_id = $1 AND public.cell.status = 0';
            const result = await connection.query(sql, [r.user_id]);
            connection.release();
            if (result == null) {
                return null;
            } else {
                return result.rows;
            }
        } catch (error) {
            throw new Error('Error while featching data');
        }
    }
    async deleteCell(r: cell): Promise<cell[]> {
        try {
            const connection = await pool.connect();
            const sql = 'DELETE FROM public.cell WHERE public.cell.user_id = $1 ABD public.cell.room_id = $2';
            const result = await connection.query(sql, [r.user_id, r.room_id]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error('Error while remove from cell');
        }
    }
    async getTotalPrice(r: room): Promise<room[]> {
        try {
            const connection = await pool.connect();
            const sql = `SELECT SUM(roomcoast) as Total FROM public.room INNER JOIN public.cell ON public.cell.room_id = public.room.id WHERE public.cell.user_id = $1`;
            const result = await connection.query(sql, [r.user_id]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error("Error while fetching data !");
        }
    }

}

export default Cell;

