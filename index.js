'use strict'

var mongoose = require('mongoose');

//cargar el modulo de app
var app = require('./app');

//especificar el puerto que la aplicacion va a usar
var port = 4000;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/apiRest', { useNewUrlParser: true, useUnifiedTopology: true }).
    then(() => {
        
        console.log("Se ha realizado la conexion");

        //crear servidor
        app.listen(port, () => {
            console.log('Puerto corriendo en http://locahost:'+port);
        })

    });