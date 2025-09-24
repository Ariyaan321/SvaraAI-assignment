const Task = require('../models/tasks')
const mongoose = require('mongoose')

async function createTask(req, res) {
    try {
        console.log('in create task----');
        const taskId = req.params.taskId // should we look for id for newly created one's ?
        const taskData = req.body
        const taskExist = await Task.findByIdAndUpdate(taskId, taskData, { new: true })
        if (!taskExist) {
            await Task.create(taskData) // mongodb 'create' function
            res.status(201).send("task created successfully")
            console.log('created task----: ', taskData);
        }
        else {
            res.status(409).json("Task already exist's")
        }
    } catch {
        res.status(500).json("Some error occured in creating task")
    }
}

async function editTask(req, res) {
    try {
        const taskId = req.params.taskId // REST's resource oriented endpoint
        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true })
        if (!updatedTask) {
            res.status(404).json("task does not exist's")
        }
        res.status(200).json("task edited successfully")
        console.log('task edited----');
    } catch {
        res.status(500).json("Some error occured in editing the task")
    }
}

async function listTask(req, res) {
    try {
        const { projectId } = req.params
        console.log('in projects tasks here----: ', projectId);
        const tasks = await Task.find({ projectId })
        res.status(200).json(tasks)
        console.log('all tasks listed for that project----', tasks.length);
    } catch {
        res.status(500).json("Some error occured in listing the project's tasks",)
    }
}

async function deleteTask(req, res) {
    try {
        console.log('in delete data----');
        const taskParamId = req.params.taskId
        const taskExist = await Task.findById(taskParamId)
        if (!taskExist) {
            res.status(404).json("task does not exists")
        }
        await Task.deleteOne({ _id: taskParamId })
        console.log('deleted task----: ', taskExist);
        return res.status(203).json("Task deleted successfully")
    } catch {
        res.status(500).json("The project_id entered may not be correct")
    }
}

module.exports = {
    createTask,
    editTask,
    listTask,
    deleteTask
}