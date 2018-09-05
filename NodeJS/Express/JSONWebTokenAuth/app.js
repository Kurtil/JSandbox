// Imports
var express     = require('express');
var bodyParser  = require('body-parser');
var apiRouter   = require('./apiRouter').router;
const mongoose = require('mongoose');

// db connection
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

// db setup
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Instantiate server
var server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Configure routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).json({"message": "Hello world!"});
});

server.use('/api', apiRouter);

// Launch server
server.listen(8090, function() {
    console.log('Server listenning');
});