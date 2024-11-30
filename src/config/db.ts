import mongoose from "mongoose"

export const connectToDatabase = async () => {
  const mongoUri = process.env.MONGO_URI as string
  try {
    await mongoose.connect(mongoUri)
    console.log('Successfully connected to database');
  } catch (error) {
    console.error(error);
  }
} 