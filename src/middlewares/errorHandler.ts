import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response";
import { StatusCodes } from 'http-status-codes'

interface HttpException extends Error {
  status?: number;
  error?: any;
}

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  const status = error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR;
  const message = status === 500 ? 'Internal server error.' : error.message;
  const errors = error.error
  errorResponse(res, status, message, errors)  
}

export default errorMiddleware