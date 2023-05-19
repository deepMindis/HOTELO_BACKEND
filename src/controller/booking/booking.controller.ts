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
        if (boking) {
            const update = await bookingModel.updateDat(req.body);
            res.json({
                status: 0,
                data: { ...boking },
                message: 'Booking correct !',
            });
        } else {
            res.json({
                status: 2,
                data: "something error",
                message: 'Booking correct !',
            });
        }
    } catch (error) {
        next(error);
    }
};