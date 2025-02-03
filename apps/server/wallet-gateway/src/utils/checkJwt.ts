import { NextFunction } from 'express';

export const checkJwt = async (req, {}, next: NextFunction) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      throw new Error('Acceso denegado');
    }
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
};
