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
                message: 'Faltan datos'
            });
        }

        if(validated_title && validated_content){


            return res.status(200).send({
                article: params
            });

        }else{
            return res.status(200).send({
                message: 'los datos no son validos'
            });

        } 
    }


};

module.exports = controller;