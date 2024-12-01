import bcrypt from 'bcrypt'
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