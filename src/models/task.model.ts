import mongoose from "mongoose";

export const taskModel = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  statusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status', 
    required: true
  },
  isImportant: { type: Boolean, default: false },
  dueDate: { type: Date, require: true},
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }
})


