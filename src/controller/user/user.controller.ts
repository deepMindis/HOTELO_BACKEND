import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../../model/user/user.model';


const userModel = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userModel.getuser(req.body.email, (error: any, result: any) => {
      if (error) {
        return res.json({
          success: 0,
          message: error,
        })
      }
      if (result) {
        return res.json({
          success: 0,
          message: `This user is ${req.body.email} exist`
        })
      } else {
        userModel.createUser(req.body, (error: any, result: any) => {
          if (error) {
            return res.json({
              success: 0,
              data: error,
            });
          } else {
            return res.json({
              success: 1,
              message: result,
            });
          }
        });
      }
    })
  } catch (error) {
    next(error);
  }
};
