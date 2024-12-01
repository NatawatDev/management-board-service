import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { errorResponse } from "../utils/response"

export const validateData = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return errorResponse(res, StatusCodes.BAD_REQUEST, 'Please fill out the information completely.');
      } else {
        return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error.');
      }
    }
  };
}