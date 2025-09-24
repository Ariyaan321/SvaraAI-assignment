const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./config/db')
const userRouter = require('./routes/') // chang name of variable
const productRouter = require('./routes/');

const server = express();
server.use(cors())
server.use(express.json());

connectToMongoDB();

// Route registration for all /users routes
server.use('/users', userRouter);

// Route registration for all /products routes
server.use('/products', productRouter);

// root route endpoint
server.get('/', (req, res) => {
    res.send("Root endpoint!");
});

server.get('/userData', (req, res) => {
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