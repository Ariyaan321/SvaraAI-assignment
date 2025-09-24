const express = require('express')
const router = express.Router()
const {
    createData,
    listData,
    deleteData,    
} = require('../controllers/projectsController')

router.post('/', createData)
    .get('/', listData)
    .delete('/:id', deleteData)

module.exports = router;