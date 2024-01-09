var express = require('express');
var path = require('path');
var cors=require("cors");

var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("./app_api/models/db");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter= require("./app_api/routes/index"); 
var app = express();
var allowCrossDomain = function(req, res, next) { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    }
    app.use(allowCrossDomain);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api",apiRouter);
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
