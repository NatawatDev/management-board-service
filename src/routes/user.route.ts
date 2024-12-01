import { Router } from 'express'
import { validateData } from '../middlewares/validateData'
import { createUserSchema, signInUserSchema } from '../schemas/user.schema'
import { createUser, userSignIn } from '../controllers/user.controllers'

const router = Router()

//route for user
router.post('/create-user', validateData(createUserSchema), createUser)
router.post('/sign-in', validateData(signInUserSchema), userSignIn)


export default router