import cell from '../../types/cell.types';
import pool from '../../database/index';
import room from '../../types/room.types';

class Cell {
    async addNewRoom(c: cell): Promise<cell> {
        try {
            const connection = await pool.connect();
            const sql = `INSERT INTO public.cell(user_id, room_id) VALUES($1, $2) returning *`;
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
    async getAllCell(r: room): Promise<room[]> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM public.room INNER JOIN public.cell ON public.cell.room_id = public.room.id WHERE public.cell.user_id = $1';
            const result = await connection.query(sql, [r.user_id]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error('Error while featching data');
        }
    }
    async deleteCell(r: room): Promise<room[]> {
        try {
            const connection = await pool.connect();
            const sql = 'DELETE FROM public.cell WHERE public.cell.id = $1';
            const result = await connection.query(sql, [r.id]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error('Error while remove from cell');
        }
    }

}

export default Cell;

