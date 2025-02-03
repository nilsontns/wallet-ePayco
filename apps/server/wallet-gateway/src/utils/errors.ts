import { NextFunction, Request, Response } from 'express';
import { ErrorWithDetails } from './errorHandler';
import { StatusCodes } from 'http-status-codes';

export const errorHandler = (
  err: ErrorWithDetails,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ErrorWithDetails) {
    return res
      .status(err.code)
      .json({ message: err.message ? err.message : StatusCodes[res.statusCode], status: err.code });
  } else {
    console.log(err);
    res
      .status(500)
      .json({ message: StatusCodes[res.statusCode], status: StatusCodes.INTERNAL_SERVER_ERROR });
    next();
  }
};
