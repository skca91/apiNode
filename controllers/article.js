'use strict'

var validator = require('validator');
var Article = require('../models/article');

var controller = {

    raiz:(req, res) => {
    
        return res.status(200).send({
            author: 'stephanie correa'
        });
    },

    save: (req, res) => {

        var params = req.body;

        try{

            var validated_title = !validator.isEmpty(params.title);
            var validated_content = !validator.isEmpty(params.content);

        }catch(error){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos'
            });
        }

        if(validated_title && validated_content){

            //se instancia el modelo
            var article = new Article();

            //se asignan los valores en el modelo
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            //se guarda en la base 
            article.save((error, articleStored) => {

                if(error || articleStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });

            });

            

        }else{
            return res.status(200).send({
                status: 'error',
                message: 'los datos no son validos'
            });

        } 
    }


};

module.exports = controller;