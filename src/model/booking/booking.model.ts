import Booking from '../../types/booking.types';
import pool from '../../database/index';

class BookingRoom {
    async bookingRoom(b: Booking): Promise<Booking> {
        try {
            const connection = await pool.connect();
            const sql = `INSERT INTO public.booking( bookingcheckin, bookingcheckout, total, numberadult, numberchild, paymenttype, "userID", "roomID", "numberofRoom") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
            const result = await connection.query(sql, [
                b.bookingcheckin,
                b.bookingcheckout,
                b.total,
                b.numberadult,
                b.numberchild,
                b.paymenttype,
                b.userID,
                b.roomID,
                b.numberofRoom
            ]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error('Error in server please try later !');
        }
    }
}
export default BookingRoom;