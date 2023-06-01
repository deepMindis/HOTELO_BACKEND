import Booking from '../../types/booking.types';
import pool from '../../database/index';
import booking from '../../types/booking.types';



class BookingRoom {

    async bookingRoom(b: Booking): Promise<Booking> {
        try {
            const connection = await pool.connect();
            const sql = 'CALL public.new_update($1::date,$2::date,$3::integer,$4::integer,$5:: integer,$6:: integer,$7:: uuid)';
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
    async requestTime(b: booking): Promise<Booking[] | null> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM public.booking WHERE(booking.userid = $1 AND booking.bookingcheckin <= CURRENT_DATE AND booking.bookingcheckout >= CURRENT_DATE);';
            const result = await connection.query(sql, [b.userID]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error("Time is not correct !!");
        }
    }
}

export default BookingRoom;