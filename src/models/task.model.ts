import mongoose, { Document, Schema } from "mongoose"

export interface ITask extends Document {
  title: string
  description: string
  status: number
  isImportant: boolean
  dueDate: Date
  createdAt: Date
  updatedAt?: Date
  user: mongoose.Types.ObjectId
}

export const taskSchema: Schema<ITask> = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: Number,
    enum: [1, 2, 3, 4], // 1 = todo, 2 = in progress, 3 = ontest, 4 = done
    required: true,
    default: 1
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  isImportant: { type: Boolean, default: false },
  dueDate: { type: Date, require: true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }
})


export const taskModel = mongoose.model<ITask>("Task", taskSchema);