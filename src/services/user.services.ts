import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userModel } from '../models/user.model'

export const createUserService = async (email: string, password: string, firstname: string, lastname: string) => {
  try {
    const existingUser = await userModel.findOne({ email })

    if (existingUser) {
      throw new Error('This email already exists in the system.')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new userModel({
      email,
      password: hashedPassword,
      firstname,
      lastname
    })

    await newUser.save()

    return newUser

  } catch (error) {
    throw error
  }
}

export const signInUserService = async (email: string, password: string) => {
  try {
    const existingUser = await userModel.findOne({ email })

    if (!existingUser) {
      throw new Error('Not found this email in the system.')
    }

    const storedPassword = existingUser.password

    const isPasswordValid = await bcrypt.compare(password, storedPassword)

    if (!isPasswordValid) throw new Error('Email or Password is invalid.')
    
    const token = jwt.sign({ id: existingUser._id ,firstname: existingUser.firstname, lastname: existingUser.lastname, tasks: existingUser.tasks }, process.env.JWT_SECRET as string, {
      expiresIn: "1h"
    })

    return token

  } catch (error) {
    throw error
  }
}