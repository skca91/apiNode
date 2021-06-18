'use strict'

var mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/apiRest', { useNewUrlParser: true, useUnifiedTopology: true }).
    then(() => {
        console.log("Se ha realizado la conexion");
    });