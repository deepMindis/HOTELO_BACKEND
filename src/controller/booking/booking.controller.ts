import { NextFunction, Request, Response } from 'express';
import BookingRoom from '../../model/booking/booking.model';
const bookingModel = new BookingRoom();

export const booking = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const boking = await bookingModel.bookingRoom(req.body);
        res.json({
            status: 0,
            data: { ...boking },
            message: 'Booking correct !',
        });
    } catch (error) {
        next(error);
    }
};