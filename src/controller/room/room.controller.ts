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
            status: 0,
            data: room,
            message: "data fetch correct"
        })
    } catch (error) {
        next(error);
    }
};

export const getAllRooms = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const rooms = await roomModel.getAllRooms();
        res.json({
            status: 0,
            data: rooms,
            message: "You get All Rooms"
        })
    } catch (error) {
        next(error);
    }
}
export const searchRoom = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const rooms = await roomModel.serachRoom(req.body);
        res.json({
            status: 0,
            data: rooms,
            message: "You get All Rooms"
        })
    } catch (error) {
        next(error);
    }
}