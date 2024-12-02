import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { successResponse } from '../utils/response'
import { createUserService, signInUserService } from '../services/user.services'

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstname, lastname } = req.body

    const newUser = await createUserService(email, password, firstname, lastname)

    return successResponse(res, StatusCodes.CREATED, 'Resgisted successfully.', { firstname: newUser.firstname })
    
  } catch (error) {
    next(error)
  }
}

export const userSignIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    const token = await signInUserService(email, password)

    return successResponse(res, StatusCodes.OK, 'Signed in successfully.', { token: token })

  } catch (error) {
    next(error)
  }
}