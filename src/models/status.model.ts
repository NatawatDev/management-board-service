import mongoose from "mongoose"

export const statusModel = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  statusCode: {
    type: Number,
    enum: [1, 2, 3, 4], // 1 = todo, 2 = in progress, 3 = ontest, 4 = done
    default: 1
  },          
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }
})