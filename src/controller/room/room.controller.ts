import { NextFunction, Request, Response } from 'express';
import RoomModel from '../../model/room/room.model';
const roomModel = new RoomModel();
export const getRoomsByID = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const room = await roomModel.getRooms(req.body);
        res.json({
            success: 0,
            data: { ...room },
            message: "data fetch correct"
        })
    } catch (error) {
        next(error);
    }
};