import pool from '../../database/index';
import room from '../../types/room.types';
import Room from '../../types/room.types';
class RoomModel {
    async getRooms(r: Room): Promise<Room[]> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM PUBLIC.room WHERE roomtypeid = $1 AND roomstate = 0';
            const result = await connection.query(sql, [r.roomtypeID]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error('Error while featching data');
        }
    }

    async getAllRooms(): Promise<Room[]> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT nameroom , roomnumber,petfrindly,roomcoast,roomstate,room.photo,smokefrindly from public.room_type, public.room WHERE room.roomtypeid = room_type.id';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error('Error while Fetching Data !');
        }
    }
    async serachRoom(r: room): Promise<Room[]> {
        try {
            const connection = await pool.connect();
            const sql = "SELECT nameroom , roomnumber,petfrindly,roomcoast,roomstate,room.photo,smokefrindly from public.room_type, public.room WHERE room.roomnumber::VARCHAR LIKE $%1%;";
            const result = await connection.query(sql, [r.value]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error('Error while featching data');
        }
    }
}
export default RoomModel;