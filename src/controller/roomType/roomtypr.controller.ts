import { NextFunction, Request, Response } from 'express';
import Roomtype from '../../model/roomType/roomtype.model';
const roomtype = new Roomtype();
export const roomTypeRES = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const roomType = await roomtype.getRoomType();
        res.json({
            success: 0,
            data: { ...roomType },
            message: "All Room types",
        });
    } catch (error) {
        next(error);
    }
};