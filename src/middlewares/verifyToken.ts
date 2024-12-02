import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { HttpException } from '../exception/exception'
import { verifyJwt } from '../utils/jwtUtils'

async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1]

    if (!accessToken) return next(new HttpException(StatusCodes.UNAUTHORIZED, 'Unauthorize please sign in.'))

    const { decoded, expired } = verifyJwt(accessToken as string)

    if (expired) return next(new HttpException(StatusCodes.UNAUTHORIZED, 'Token is expired.'))
    
    if (decoded) {
      res.locals.user = decoded
      return next()
    }
    
    next()
  } catch (err) {
    next(err)
  }
}

export default verifyToken;
