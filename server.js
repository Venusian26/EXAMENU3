const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const wagner = require('wagner-core');
const path = require('path');

const _config = require('./_config');
const expressJWT = require('express-jwt');


let app = express();

require('./models/models')(wagner);


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});


const urlBase = "/api/v1/";

const jwtOptions = {
    path: [
        // /^\/api\/v1\/usuarios\/login\/.*/
       /^\/api\/v1\/fanpages\//
    ]
};

app.use(expressJWT({ secret: _config.SECRETJWT }).unless(jwtOptions)); //restric routes

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(err.status).send({
            code: err.status,
            message: err.message,
            details: err.code
        });
    } else {
        next();
    }
});

const fanpage = require('./routers/fanpage.router')(wagner);

app.use(urlBase + 'fanpages', fanpage);


module.exports = app;
