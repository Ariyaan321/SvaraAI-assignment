const mongoose = require("mongoose");
const { Schema } = mongoose

const TasksSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        priority: {
            type: String,
            required: true
        },
        deadline: {
            type: Date,
            default: Date.now
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'projects'
        }
    },
    {
        versionKey: false
    }
)

const Tasks = new mongoose.model('tasks', TasksSchema)
module.exports = Tasks