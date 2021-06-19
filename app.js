'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//carga las rutas
var articleRouter = require('./routes/article');

//Para poder usar lo que me llega a json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//rutas
app.use('/api', articleRouter);

//para exportar el modulo actual
module.exports = app;