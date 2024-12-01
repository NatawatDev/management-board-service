import { taskModel } from '../models/task.model'
import { userModel } from '../models/user.model'
import { ITask } from '../models/task.model';

export const createTaskService = async (userId: string, title: string, description: string, dueDate: string) => {
  try {    
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const newTask = new taskModel({
      title,
      description,
      dueDate,
      user: userId,
      createdAt: new Date()
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
    if (!deleteTask) {
      throw new Error("Task not found.")
    }
    const userId = deleteTask.user.toString()

    const user = await userModel.findById(userId)
    if (user) {
      user.tasks = user.tasks.filter(taskId => taskId.toString() !== id)
      await user.save()
    }

    return deleteTask
  } catch (error) {
    throw error
  }
}

export const editTaskByIdService = async (userId: string, taskId: string, updateData: Partial<ITask>) => {
  try {
    const task = await taskModel.findById(taskId)
    if (!task) {
      throw new Error("Task not found.")
    }

    if (task.user.toString() !== userId) {
      throw new Error("You are not authorized to modify this task.")
    }

    const updatedTask = await taskModel.findByIdAndUpdate(
      taskId,
      { 
        ...updateData,
        updatedAt: new Date() 
      },
      { new: true }
    );

    if (!updatedTask) {
      throw new Error("Task update failed.");
    }

    return updatedTask
  } catch (error) {
    throw error
  }
};