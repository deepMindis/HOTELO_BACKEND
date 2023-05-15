import { NextFunction, Request, Response } from 'express';
import ServicesModel from '../../model/services/services_model';
const services_model = new ServicesModel();
export const servicesModelController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const roomType = await services_model.getServices();
        res.json({
            status: 0,
            data: roomType,
            message: "All Come true",
        });
    } catch (error) {
        next(error);
    }
};