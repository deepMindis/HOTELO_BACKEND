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
export const addNewServices = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const addServices = await services_model.addservices(req.body);
        res.json({
            status: 0,
            data: { ...addServices },
            message: "The Servers order Successfuly !",
        });
    } catch (error) {
        next(error);
    }
}

export const getMealsOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const getmeeals = await services_model.getMeals();
        res.json({
            status: 0,
            data: getmeeals,
            message: "Successfuly !",
        });
    } catch (error) {
        next(error);
    }
}
export const getSandwichsOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const getsand = await services_model.getSandwinch();
        res.json({
            status: 0,
            data: getsand,
            message: "Successfuly !",
        });
    } catch (error) {
        next(error);
    }
}

export const getdrinksOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const getderink = await services_model.getDricks();
        res.json({
            status: 0,
            data: getderink,
            message: "Successfuly !",
        });
    } catch (error) {
        next(error);
    }
}
export const servicesORderMake = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const order = await services_model.servicesOrder(req.body);
        res.json({
            status: 0,
            data: order,
            message: "The order make  Successfuly !",
        });
    } catch (error) {
        next(error);
    }
}
export const servicesrestueantMake = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const orderres = await services_model.makeResturantOrder(req.body);
        res.json({
            status: 0,
            data: orderres,
            message: "The order make  Successfuly !",
        });
    } catch (error) {
        next(error);
    }
}
