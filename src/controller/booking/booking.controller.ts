import { NextFunction, Request, Response } from 'express';
import BookingRoom from '../../model/booking/booking.model';
const bookingModel = new BookingRoom();

export const booking = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const booking = bookingModel.bookingRoom(req.body);
        res.json({
            status: 0,
            data: { ...booking },
            message: "Booking correct !"
        });
    } catch (error) {
        next(error);
    }
};
export const fetchData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const fetch = await bookingModel.getRoomCell(req.body);
        res.json({
            status: 0,
            data: fetch,
            message: 'correct !',
        });

    } catch (error) {
        next(error);
    }
};
