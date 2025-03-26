import express from 'express'
import { addTask, completeTask, deleteTask, getTask } from '../controllers/taskController.js'
import authMiddleware from '../middlewares/auth.js'

const taskRouter = express.Router()

taskRouter.post('/add',authMiddleware,addTask)
taskRouter.get('/get',authMiddleware,getTask)
taskRouter.delete('/delete/:id',authMiddleware,deleteTask)
taskRouter.put('/complete/:id',authMiddleware,completeTask)


export default taskRouter