import app from './app'
import dotenv from 'dotenv'
import { connectToDatabase } from './config/db'
dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Start Express server
    app.listen(PORT, () => {
      connectToDatabase()
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database', error);
    process.exit(1); // Exit process if connection fails
  }
}

startServer()