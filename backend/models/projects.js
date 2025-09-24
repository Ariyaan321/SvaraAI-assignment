const mongoose = require("mongoose");
const { Schema } = mongoose

const ProjectsSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    }
)

const Projects = new mongoose.model('projects', ProjectsSchema)
module.exports = Projects