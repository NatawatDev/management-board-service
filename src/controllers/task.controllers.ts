import { Request, Response } from "express"
import { StatusCodes } from 'http-status-codes'
import { successResponse, handleError, errorResponse } from '../utils/response'
import { 
  createTaskService, 
  getTaskListService, 
  getTaskByIdService, 
  getTaskByUserIdService,
  deleteTaskByIdService, 
  editTaskByIdService 
} from '../services/task.services'

export const createTask = async (req: Request, res: Response) => {
  try {
    const { userId, title, description } = req.body

    const task = await createTaskService(userId, title, description)

    return successResponse(res, StatusCodes.CREATED, 'Created Task successfully.', { taskData: task })

  } catch (error) {
    handleError(error, res)
  }
}

export const getTasks = async (req: Request, res: Response) => {
  try {
    const taskList = await getTaskListService()

    return successResponse(res, StatusCodes.OK, '', { taskList: taskList })
  } catch (error) {
    handleError(error, res)
  }
}

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string    
    const task = await getTaskByIdService(id)

    if (!task) return errorResponse(res, StatusCodes.BAD_REQUEST, 'Task not found.')
    
    return successResponse(res, StatusCodes.OK, '', { task: task })    
  } catch (error) {
    handleError(error, res)
  }
}

export const getTaskByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string    
    const userTask = await getTaskByUserIdService(userId)
    
    return successResponse(res, StatusCodes.OK, '', { userTask: userTask })    
  } catch (error) {
    handleError(error, res)
  }
}

export const deleteTaskById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string    
    const deleteTask = await deleteTaskByIdService(id)

    if (!deleteTask) return errorResponse(res, StatusCodes.BAD_REQUEST, 'Task not found.')
    
    return successResponse(res, StatusCodes.OK, 'Deleted Task successfully.',)    
  } catch (error) {
    handleError(error, res)
  }
}

export const editTaskById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string    
    const { title, description, isImportant, status, dueDate } = req.body;
    
    const modifyTask = await editTaskByIdService(id, { 
      title, 
      description, 
      isImportant, 
      status, 
      dueDate
    })

    return successResponse(res, StatusCodes.OK, 'Modify Task successfully.', { task: modifyTask })    
  } catch (error) {
    handleError(error, res)
  }
}