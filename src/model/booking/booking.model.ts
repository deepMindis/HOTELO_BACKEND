import Booking from '../../types/booking.types';
import pool from '../../database/index';
import { booking } from '../../controller/booking/booking.controller';

class BookingRoom {
    async bookingRoom(b: Booking): Promise<Booking> {
        try {
            const connection = await pool.connect();
            const sql = `INSERT INTO public.booking( bookingcheckin, bookingcheckout, total, numberadult, numberchild, paymenttype, userID, roomID) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *`;
            const result = await connection.query(sql, [
                b.bookingcheckin,
                b.bookingcheckout,
                b.total,
                b.numberadult,
                b.numberchild,
                b.paymenttype,
                b.userID,
                b.roomID,
            ]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error('Error in server please try later !');
        }
    }
    async getUser(b: Booking): Promise<Booking | null> {
        try {
            const connection = await pool.connect();
            const sql = 'SELECT * FROM public.booking WHERE userID = $7 AND roomID = $8';
            const result = await connection.query(sql, [b.userID, b.roomID]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error("The user is already booking this Room");
        }
    }
}

export default BookingRoom;