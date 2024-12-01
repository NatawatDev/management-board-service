import { Router } from 'express'
import { validateData } from '../middlewares/validateData'
import  verifyToken from '../middlewares/verifyToken'
import { createTaskSchema } from '../schemas/task.schema'
import { createTask, getTasks, getTaskById, getTaskByUserId, deleteTaskById, editTaskById } from '../controllers/task.controllers'

const router = Router()

//route for user
router.get('/', verifyToken, getTasks)
router.get('/:id', verifyToken, getTaskById)
router.get('/user/:userId', verifyToken, getTaskByUserId)
router.delete('/:id', verifyToken, deleteTaskById)
router.post('/create', validateData(createTaskSchema), verifyToken, createTask)
router.put('/modify/:id', verifyToken, editTaskById)

export default router