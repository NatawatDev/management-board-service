import { Request, Response, NextFunction } from 'express'
import { HttpException } from '../exception/exception';
import { z, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';


export const validateData = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        throw new HttpException(StatusCodes.BAD_REQUEST, 'Please fill out the information completely.')
      }
    }
  };
}