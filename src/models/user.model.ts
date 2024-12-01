import mongoose, { Document, Schema, Model } from "mongoose";

interface IUser extends Document {
  email: string
  password: string
  firstname: string
  lastname: string
  createdAt: Date
  updatedAt?: Date
  tasks: mongoose.Types.ObjectId[]
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tasks'
  }]
}, { timestamps: true })

export const userModel = mongoose.model<IUser>("User", userSchema);

  