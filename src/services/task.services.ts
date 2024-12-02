import { taskModel } from '../models/task.model'
import { userModel } from '../models/user.model'
import { HttpException } from '../exception/exception'
import { StatusCodes } from 'http-status-codes'
import { ITask } from '../models/task.model'

export const createTaskService = async (userId: string, title: string, description: string, dueDate: string) => {
  const user = await userModel.findById(userId)

  if (!user) throw new HttpException(StatusCodes.NOT_FOUND, 'User not found')

  const newTask = new taskModel({
    title,
    description,
    dueDate,
    user: userId,
    createdAt: new Date()
  })

  await newTask.save()
  
  user.tasks.push(newTask.id)
  
  await user.save()
  
  return newTask    
}

export const getTaskListService = async () => {
  const taskList = await taskModel.find()
    
  if (taskList.length === 0) throw new HttpException(StatusCodes.NOT_FOUND, 'Task list not found');
  
  return taskList
}

export const getTaskByIdService = async (id: string) => {
  const task = await taskModel.findById(id)
  
  if (!task) throw new HttpException(StatusCodes.NOT_FOUND, 'Task not found')
  
  return task
}

export const getTaskByUserIdService = async (userId: string) => {
  const userTask = await userModel.findById(userId).populate('tasks')
  
  if (!userTask) throw new HttpException(StatusCodes.NOT_FOUND, 'User not found')  

  return userTask.tasks
}

export const deleteTaskByIdService = async (id: string) => {
  const deleteTask = await taskModel.findByIdAndDelete(id)

  if (!deleteTask) throw new HttpException(StatusCodes.NOT_FOUND, 'Task not found')
  
  const userId = deleteTask.user.toString()
  const user = await userModel.findById(userId)

  if (user) {
    user.tasks = user.tasks.filter(taskId => taskId.toString() !== id)
    await user.save()
  }

  return deleteTask
}

export const editTaskByIdService = async (userId: string, taskId: string, updateData: Partial<ITask>) => {
  const task = await taskModel.findById(taskId)

  if (!task) throw new HttpException(StatusCodes.NOT_FOUND, 'Task not found')
  
  if (task.user.toString() !== userId) throw new HttpException(StatusCodes.FORBIDDEN, 'You are not authorized to modify this task')
  
  const updatedTask = await taskModel.findByIdAndUpdate(taskId, { ...updateData, updatedAt: new Date()},{ new: true })

  if (!updatedTask) throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Task update failed')
  
  return updatedTask
};