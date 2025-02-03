import { StatusCodes } from 'http-status-codes';

export interface BodyParserSyntaxError extends SyntaxError {
  body: string;
  expose: boolean;
  stack: string;
  status: number;
  statusCode: number;
  type: 'entity.parse.failed' | string;
}

export abstract class ErrorWithDetails extends Error {
  constructor(message?: string, public details?: unknown) {
    super(message);
  }
  abstract code: StatusCodes;
}

export class BadRequestError extends ErrorWithDetails {
  code = StatusCodes.BAD_REQUEST;
}
export class ConflictError extends ErrorWithDetails {
  code = StatusCodes.CONFLICT;
}
export class ForbiddenError extends ErrorWithDetails {
  code = StatusCodes.FORBIDDEN;
}
export class NotFoundError extends ErrorWithDetails {
  code = StatusCodes.NOT_FOUND;
}
export class UnauthorizedError extends ErrorWithDetails {
  code = StatusCodes.UNAUTHORIZED;
}
