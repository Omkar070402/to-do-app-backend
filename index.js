import express from 'express'
import connectDB from './configs/db.js'
import 'dotenv/config'
import userRouter from './routes/userRouter.js'
import cors from 'cors'
import taskRouter from './routes/taskRouter.js'

const app = express()

const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// db connection
connectDB()

app.use('/api/v1/user', userRouter)
app.use('/api/v1/task', taskRouter)

app.get('/', (req, res) => {
    res.send('API working')
})

app.listen(PORT, () => {
    console.log('server is running on port :', PORT);

})

