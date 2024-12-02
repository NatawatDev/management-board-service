import express, { Express, urlencoded, json } from 'express'
import cors from 'cors'
import errorMiddleware from './middlewares/errorHandler'
import limiter from './middlewares/rateLimit'
import userRouter from './routes/user.route'
import taskRouter from './routes/task.route'

const app: Express = express()
app.use(cors())
app.use(limiter)
app.use(urlencoded({ extended: true }))
app.use(json())

//router
app.use('/api/v1', userRouter)
app.use('/api/v1/tasks', taskRouter)

//register errors 
app.use(errorMiddleware)

export default app