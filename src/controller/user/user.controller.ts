import { NextFunction, Request, Response } from 'express';
import UserModel from '../../model/user/user.model';
import jwt from 'jsonwebtoken';
import config from '../../config/config';

const userModel = new UserModel();

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const superfund = await userModel.getusers(req.body);
    if (superfund) {
      res.json({
        success: 1,
        message: 'the user is already exist',
      });
    } else {
      const user = await userModel.createUser(req.body);
      res.json({
        success: 0,
        data: { ...user },
        message: 'user created successfully',
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getusers(req.body);
    res.json({
      success: 0,
      data: { ...user },
      message: 'user is exist',
    });
  } catch (error) {
    next(error);
  }
};
export const forgetPasswordcontroller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const superfund = await userModel.getusers(req.body);
    if (superfund) {
      const user = await userModel.forgetPassword(req.body);
      res.json({
        success: 0,
        data: { ...user },
        message: 'the code is set for your account',
      });
    } else {
      res.json({
        success: 1,
        message: `the nothing email like that ${req.body.email}`,
      })
    }
  } catch (error) {
    next(error);
  }
};

export const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.authenticate(email, password);
    const token = jwt.sign({ user }, config.token as unknown as string);
    if (!user) {
      return res.status(401).json({
        success: 1,
        message: 'the email or password do not match please try again',
      });
    }
    return res.header('Access-Control-Allow-Origin', req.headers.origin).json({
      success: 0,
      data: { ...user, token },
      message: 'user authenticated successfully',
    });
  } catch (error) {
    next(error);
  }
};
