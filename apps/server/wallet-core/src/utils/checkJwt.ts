import { NextFunction, Request, Response } from 'express';
import { Jwt } from './jwt';
import { IUser } from '@libs/shared';
import { UserService } from '../services';

export const checkJwt = async (req, {}, next: NextFunction) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      throw new Error('Access denied');
    }
    const jwt = token.split(' ').pop();
    const payload: any = Jwt.verifyToken(`${jwt}`) as IUser;
    const user: any = await UserService.getByJwtVerify(payload._id);
    req.userId = user._id;
    next();
  } catch (error) {
    next(error);
  }
};
