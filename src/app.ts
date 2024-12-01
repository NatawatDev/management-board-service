import express, { Express, urlencoded, json } from 'express'
import cors from 'cors'
import limiter from './middlewares/rateLimit'
import userRouter from './routes/user.route'

const app: Express = express()
app.use(cors())
app.use(limiter)
app.use(urlencoded({ extended: true }))
app.use(json())

//router
app.use('/api/v1', userRouter)


export default app