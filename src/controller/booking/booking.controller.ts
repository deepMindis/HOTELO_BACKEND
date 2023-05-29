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
            const update = await bookingModel.updateDataCell(req.body);
            const updateroom = await bookingModel.updateRoom(req.body);
            res.json({
                status: 0,
                data: { ...boking },
                message: 'Booking correct !',
            });
        } else {
            res.json({
                status: 1,
                data: "something error",
                message: 'Not Booking correct !',
            });
        }
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
