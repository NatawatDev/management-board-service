import { taskModel } from '../models/task.model'
import { userModel } from '../models/user.model'
import { ITask } from '../models/task.model';

export const createTaskService = async (userId: string, title: string, description: string) => {
  try {    
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const newTask = new taskModel({
      title,
      description,
      user: userId,
      updatedAt: Date.now
    })

    await newTask.save()

    user.tasks.push(newTask.id);
    await user.save();

    return newTask    

    
  } catch (error) {
    throw error
  }
}

export const getTaskListService = async () => {
  try {
    const taskList = await taskModel.find()
    return taskList
  } catch (error) {
    throw error
  }
}

export const getTaskByIdService = async (id: string) => {
  try {
    const task = await taskModel.findById(id)
    return task || null
  } catch (error) {
    throw error
  }
}
export const getTaskByUserIdService = async (userid: string) => {
  try {
    const userTask = await userModel.findById(userid).populate("tasks")
    return userTask?.tasks
  } catch (error) {
    throw error
  }
}

export const deleteTaskByIdService = async (id: string) => {
  try {
    const deleteTask = await taskModel.findByIdAndDelete(id)

    return deleteTask || null
  } catch (error) {
    throw error
  }
}

export const editTaskByIdService = async (id: string, updateData: Partial<ITask>) => {
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(id,
      { 
        ...updateData, 
        updatedAt: Date.now()
      },
      { new: true } 
    )

    if (!updatedTask) {
      throw new Error('Not found this task in the system.')
    }

    return updatedTask

  } catch (error) {
    throw error
  }
}