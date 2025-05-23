import mongoose from "mongoose";
import Task from "../models/taskModel.js";

const addTask = async (req, res) => {
    try {

        console.log("Received request body:", req.body);


        console.log("User ID from token:", req.user?.id); // ✅ Debugging step
        if (!req.user?.id) {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }

        const { task, description, date, priority } = req.body;

        const newTask = new Task({
            task,
            description,
            date: new Date(date),
            priority,
            userId: req.user.id,
        });

        const saveTask = await newTask.save();

        res.json({
            success: true,
            error: false,
            data: saveTask,
            message: "Task Added",
        });
    } catch (error) {
        console.log("Error adding task:", error.message);
        res.json({ success: false, message: error.message });
    }
};


const getTask = async (req, res) => {
    try {

        const userId = req.user.id;
        const getAllTask = await Task.find({ userId })
        res.json({ success: true, error: false, data: getAllTask })

    } catch (error) {
        console.log(error);
        res.json({ success: false, error: true })


    }
}

const deleteTask = async (req, res) => {
    try {

        const { id } = req.params

        const deleteNow = await Task.findByIdAndDelete(id)


        if (!deleteNow) {
            return res.status(404).json({ success: false, error: true, message: "Task not found" });
        }

        res.json({ succces: true, error: false, message: 'Task is Deleted' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })


    }
}

const completeTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, { completed: true }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        res.status(200).json({ success: true, message: "Task marked as completed", data: updatedTask });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



export { addTask, getTask, deleteTask, completeTask }