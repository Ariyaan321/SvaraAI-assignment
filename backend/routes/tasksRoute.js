const express = require('express')
const router = express.Router({ mergeParams: true }) // mergeParams to access parent route params
const {
    createTask,
    editTask,
    listTask,
    deleteTask,
} = require('../controllers/tasksController')

// add pagination here
router.post('/', createTask)
    .put('/:taskId', editTask)
    .get('/', listTask)
    .delete('/:taskId', deleteTask)

module.exports = router;