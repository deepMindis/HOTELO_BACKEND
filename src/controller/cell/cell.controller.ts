import { NextFunction, Request, Response } from 'express';
import CellModel from '../../model/cell/cell.model';

const cellModel = new CellModel();

export const cellController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const str = await cellModel.roomAtCell(req.body);
        if (str) {
            res.json({
                status: 1,
                message: "Room Already in cell with you"
            })
        } else {
            const cell = await cellModel.addNewRoom(req.body);
            res.json({
                status: 0,
                message: "Cell add correct ",
            });
        }
    } catch (error) {
        next(error);
    }
}

export const getCellData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const cell = await cellModel.getAllCell(req.body);
        if (cell == null) {
            res.json({
                status: 1,
                data: cell,
                message: "Not room in the Cell",
            });
        } else {
            res.json({
                status: 0,
                data: cell,
                message: "Cell fetch correct ",
            });
        }
    } catch (error) {
        next(error);
    }
}

export const deletefromCell = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const cell = await cellModel.deleteCell(req.body);
        res.json({
            status: 0,
            data: cell,
            message: "data remove correct !",
        });

    } catch (error) {
        next(error);
    }
}
export const gettotalPrice = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const prices = await cellModel.getTotalPrice(req.body);
        res.json({
            status: 0,
            data: prices,
            message: "you can pay part of money !",
        });
    } catch (error) {
        next(error);
    }
}