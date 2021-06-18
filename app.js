'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//Para poder usar lo que me llega a json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//rutas

app.get('/', (req, res) => {
    
    return res.status(200).send({
        author: 'stephanie correa'
    });
});

//para exportar el modulo actual
module.exports = app;