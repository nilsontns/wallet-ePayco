import { IUser } from '@libs/shared';
import { Express, NextFunction, Request, Response } from 'express';
import { UserService } from '../services';

export class UserControllerClass {
  public create = async (req: Request, res: Response, next: NextFunction) => {
    const data: IUser = req.body;
    try {
      const response = await UserService.register(data);
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ error: this.errors.requiredEmail });
      return;
    }
    if (!password) {
      res.status(400).json({ error: this.errors.requiredPassword });
      return;
    }
    try {
      const resp = await UserService.login(email, password);
      res.status(200).json(resp);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  private errors = {
    accessDenied: 'ACCESS DENIED',
    requiredPassword: 'Password is required.',
    requiredEmail: 'Email is required.',
  };

  setRoutes(expressApp: Express, baseRoute?: string): void {
    expressApp.post(`${baseRoute}/user`, this.create);
    expressApp.post(`${baseRoute}/login`, this.login);

  }
}
