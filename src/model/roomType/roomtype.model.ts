import RoomType from "../../types/roomType.types";
import pool from '../../database/index';
class Roomtype {
    async getRoomType(): Promise<RoomType[]> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM public.room_type';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error('Error while featching data');
        }
    }
}
export default Roomtype;