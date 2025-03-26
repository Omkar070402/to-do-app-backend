import express, { Router } from 'express'
import { login, signup } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/login',login)
userRouter.post('/signup',signup)

export default userRouter