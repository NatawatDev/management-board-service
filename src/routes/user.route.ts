import { Router } from 'express'
import { createUser } from '../controllers/user.controller'
import { validateData } from '../middlewares/validateData'
import { createUserSchema } from '../schemas/user.schema'

const router = Router()

//route for user

router.post('/create-user', validateData(createUserSchema), createUser)


export default router