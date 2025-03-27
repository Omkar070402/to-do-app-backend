import mongoose from "mongoose";
import user from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async (req, res) => {

    try {



        const { email, password } = req.body

        const checkUser = await user.findOne({ email })

        if (!checkUser) {
            return res.json({
                success: false, message: 'user does not exist'
            })
        }

        const matchUser = await bcrypt.compare(password, checkUser.password)

        if (!matchUser) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }



        const token = jwt.sign({ id : checkUser._id }, process.env.SECRET_KEY, { expiresIn: '1hr' })


        res.status(200).json({ success: true, message: 'Login successfull',token,user: { name: checkUser.name } })

    } catch (error) {

        console.log(error);
        res.status(500).json({ success: false, message: error.message })


    }

}

const signup = async (req, res) => {

    try {


        const { email, name, password } = req.body

        if (!email || !name || !password) {
            return res.json({
                success: false, message: 'enter credentails'
            })
        }

        const checkUser = await user.findOne({ email })

        if (checkUser) {
            return res.json({
                success: false, message: 'user already exists'
            })
        }

        const hash = await bcrypt.hash(password, 10)

        const newUser = new user({
            name, email, password: hash
        })

        const saveUser = await newUser.save()

        res.json({
            success: true, message: "User registered successfully", error: false
        })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}



export { login, signup }