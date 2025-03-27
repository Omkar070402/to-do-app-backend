import mongoose, { mongo } from "mongoose";

const taskSchema = mongoose.Schema({
    task : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required  : true,
    },
    date : {
        type : Date,
        required : true,
        default : Date.now
    },
    priority : {
        type : String,
        required : true,
        default : 'Medium'
    },
    
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } ,
   
    completed: { type: Boolean, default: false }
})

const   Task = mongoose.model('Task',taskSchema)

export default Task