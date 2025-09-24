const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./config/db')
const tasksRouter = require('./routes/tasksRoute') // chang name of variable
const projectsRouter = require('./routes/projectsRoute');

const server = express();
server.use(cors())
server.use(express.json());

connectToMongoDB();

// Route registration for all /projects routes
server.use('/projects', projectsRouter);

// Route registration for all /tasks routes
server.use('/projects/:projectId/tasks', tasksRouter);

// root route endpoint
server.get('/', (req, res) => {
    res.send("Root endpoint!");
});

server.get('/taskData', (req, res) => {
    res.send()
})

server.listen(process.env.PORT, () => {
    console.log(`backend server listening on port ${process.env.PORT}`);
})

// Default catch all error handler
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

process.on('SIGINT', () => {
    console.log("SIGINT");
    mongoose.disconnect();
    console.log("TERMINATED");
});