import Booking from '../../types/booking.types';
import pool from '../../database/index';
import booking from '../../types/booking.types';
import cell from '../../types/cell.types';


class BookingRoom {
    async bookingRoom(b: Booking): Promise<Booking> {
        try {
            const connection = await pool.connect();
            const sql = `INSERT INTO public.booking( bookingcheckin, bookingcheckout, total, numberadult, numberchild, paymenttype, userID) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`;
            const result = await connection.query(sql, [
                b.bookingcheckin,
                b.bookingcheckout,
                b.total,
                b.numberadult,
                b.numberchild,
                b.paymenttype,
                b.userID,
            ]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error('Error while booking please try again !!');
        }
    }
    async updateDataCell(b: Booking): Promise<Booking[]> {
        try {
            const connection = await pool.connect();
            const sql = `UPDATE public.cell SET  status = 1 WHERE public.cell.user_id = $1`;
            const result = await connection.query(sql, [b.userID]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error("Data not update correct");
        }
    }
    async getRoomCell(b: booking): Promise<Booking[]> {
        try {
            const connection = await pool.connect();
            const sql = `SELECT public.cell.room_id FROM public.cell WHERE public.cell.user_id = $1`;
            const result = await connection.query(sql, [b.userID]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error("Error while Fetching Data");
        }
    }

    async updateRoom(c: cell): Promise<cell> {
        try {
            const connection = await pool.connect();
            const sql = 'UPDATE public.room SET roomstate = 1 WHERE public.room.id in (SELECT public.cell.room_id From public.cell WHERE public.cell.user_id = $1)';
            const result = await connection.query(sql, [c.user_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error("The data not update");
        }
    }


}

export default BookingRoom;