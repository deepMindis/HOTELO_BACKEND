import Booking from '../../types/booking.types';
import pool from '../../database/index';


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
    async updateDat(b: Booking): Promise<Booking[]> {
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
}

export default BookingRoom;