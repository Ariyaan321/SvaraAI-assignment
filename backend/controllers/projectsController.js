const Project = require('../models/projects')

async function createData(req, res) {
    try {
        console.log('in create data----');
        const projectName = req.body.name
        const projectExist = await Project.findOne({ ProjectName: projectName })
        if (projectExist) {
            res.status(409).json("Project already exist's")
        }
        else {
            await Project.create(req.body) // mongodb function 'create'
            res.status(201).send("Project created successfully")
            console.log('created project----: ', req.body);
        }
    } catch {
        res.status(500).json("Some error occured in creating project")
    }
}

async function listData(req, res) {
    try {
        const projects = await Project.find({})
        res.status(200).json(projects)
        console.log('all project listed----');
    } catch {
        res.status(500).json("Some error occured in listing the projects")
    }
}

async function deleteData(req, res) {
    try {
        console.log('in delete data----');
        const projectExist = await Project.findOne({ _id: req.params.id })
        if (!projectExist) {
            res.status(409).json("project does not exists")
        }
        else {
            await Project.deleteOne({ _id: req.params.id })
            res.status(203).json("Project deleted successfully")
            console.log('deleted project----: ', projectExist);
        }
    } catch {
        res.status(500).json("The project_id entered may not be correct")
    }
}

module.exports = {
    createData,
    listData,
    deleteData
}