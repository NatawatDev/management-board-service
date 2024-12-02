import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { HttpException } from '../exception/exception'
import { StatusCodes } from 'http-status-codes'
import { userModel } from '../models/user.model'

export const createUserService = async (email: string, password: string, firstname: string, lastname: string) => {
  const existingUser = await userModel.findOne({ email })

  if (existingUser) throw new HttpException(StatusCodes.BAD_REQUEST, 'This email already exists in the system.')

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = new userModel({
    email,
    password: hashedPassword,
    firstname,
    lastname
  })

  await newUser.save()
  
  return newUser
}

export const signInUserService = async (email: string, password: string) => {
  const existingUser = await userModel.findOne({ email })

  if (!existingUser) throw new HttpException(StatusCodes.NOT_FOUND, 'Not found this email in the system.')

  const storedPassword = existingUser.password
  const isPasswordValid = await bcrypt.compare(password, storedPassword)

  if (!isPasswordValid) throw new HttpException(StatusCodes.BAD_REQUEST, 'Not found this email in the system.')
  
  const token = jwt.sign({ id: existingUser._id ,firstname: existingUser.firstname, lastname: existingUser.lastname, tasks: existingUser.tasks }, process.env.JWT_SECRET as string, {
    expiresIn: "1h"
  })

  return token 
}