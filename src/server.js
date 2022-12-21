import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import urlRoutes from './routes/url.routes.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(userRoutes)
app.use(urlRoutes)

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Server running on port ${port}`))