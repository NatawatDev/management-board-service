import { Request, Response, NextFunction } from "express"
import { StatusCodes } from 'http-status-codes'
import { successResponse,errorResponse } from '../utils/response'
import { 
  createTaskService, 
  getTaskListService, 
  getTaskByIdService, 
  getTaskByUserIdService,
  deleteTaskByIdService, 
  editTaskByIdService 
} from '../services/task.services'

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, title, description, dueDate } = req.body

    const task = await createTaskService(userId, title, description, dueDate)

    return successResponse(res, StatusCodes.CREATED, 'Created Task successfully.', { taskData: task })

  } catch (error) {
    next(error)
  }
}

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskList = await getTaskListService()    

    return successResponse(res, StatusCodes.OK, '', { taskList: taskList })
  
  } catch (error) {
    next(error)
  }
}

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string    
    const task = await getTaskByIdService(id)
        
    return successResponse(res, StatusCodes.OK, '', { task: task })    
  
  } catch (error) {
    next(error)
  }
}

export const getTaskByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId as string    
    const userTask = await getTaskByUserIdService(userId)
    
    return successResponse(res, StatusCodes.OK, '', { userTask: userTask })    
  
  } catch (error) {
    next(error)
  }
}

export const deleteTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string    
    const deleteTask = await deleteTaskByIdService(id)
 
    return successResponse(res, StatusCodes.OK, 'Deleted Task successfully.', { taskId: deleteTask.id })    
  } catch (error) {
    next(error)
  }
}

export const editTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const userId = res.locals.user.id
    const id = req.params.id as string    
    const { title, description, isImportant, status, dueDate } = req.body
    
    const modifyTask = await editTaskByIdService(userId, id, { 
      title, 
      description, 
      isImportant, 
      status, 
      dueDate
    })

    return successResponse(res, StatusCodes.OK, 'Modify Task successfully.', { task: modifyTask })    
  } catch (error) {
    next(error)
  }
}