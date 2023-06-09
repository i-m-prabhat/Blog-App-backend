require('dotenv').config();
const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const connectDB = require("./config/databae")
const PORT = process.env.PORT || 5000;


server.listen(PORT, () =>
{
    console.log('Server Started at port : ' + PORT);
    connectDB();
})