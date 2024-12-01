import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { successResponse, handleError } from '../utils/response'
import { createUserService, signInUserService } from '../services/user.services'

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname } = req.body

    const newUser = await createUserService(email, password, firstname, lastname)

    return successResponse(res, StatusCodes.CREATED, 'Resgisted successfully.', { firstname: newUser.firstname })
    
  } catch (error) {
    handleError(error, res)
  }
}

export const userSignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const token = await signInUserService(email, password)

    return successResponse(res, StatusCodes.OK, 'Signed in successfully.', { token: token })

  } catch (error) {
    handleError(error, res)
  }
}