import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { errorResponse } from "../utils/response"
import { verifyJwt } from '../utils/jwtUtils'

async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1]

    if (!accessToken) return errorResponse(res, StatusCodes.UNAUTHORIZED, 'Unauthorize please sign in.')

    const { decoded, expired } = verifyJwt(accessToken as string)

    if (expired) return errorResponse(res, StatusCodes.UNAUTHORIZED, 'Token is expired.')
    
    if (decoded) {
      res.locals.user = decoded
      return next()
    }
    
    next()
  } catch (err) {
    console.error(err);
    return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error.')
  }
}

export default verifyToken;
