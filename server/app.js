const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const morgan = require('morgan');
const logger = morgan('dev');
const bodyParser = require('body-parser');
const db = require('./models').db;
const routes = require('../routes');
const path = require('path');

app.use(logger);
app.use((bodyParser.urlencoded({ extended: true })));
app.use(bodyParser.json());
app.use(routes); //first check if API route requests
app.use(express.static(path.join(__dirname, '..', 'public')));
//if not, then serve up the static files

app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
    console.error(err, err.stack);
    res.status(err.status || 500);
    res.send("Something went wrong: " + err.message);
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
    db.sync()
    .then(function() {
        console.log('Synced the data');
    })
    .catch(function(err) {
        console.error('Error: ', err, err.stack)
    })
})
