'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Creo el esquema del articulo para el modelo
var ArticleSchema = Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
    image: String
});

//Exporto el modulo 
module.exports = mongoose.model('Article', ArticleSchema);
//el mongoose se encarga de poner el nombre en minuscula y plural

