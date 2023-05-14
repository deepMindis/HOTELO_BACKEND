import pool from '../../database/index';
import Room from '../../types/room.types';
class RoomModel {
    async getRooms(r: Room): Promise<Room[]> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM PUBLIC.room WHERE roomtypeid = $1';
            const result = await connection.query(sql, [r.roomtypeID]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error('Error while featching data');
        }
    }
}
export default RoomModel;