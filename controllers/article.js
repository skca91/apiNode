'use strict'

var validator = require('validator');
var Article = require('../models/article');

var controller = {

    raiz:(req, res) => {
    
        return res.status(200).send({
            author: 'stephanie correa'
        });
    },

    //listar todos los articulos
    getArticles: (req, res)=>{

        var query = Article.find({});
        var last = req.params.last;

        if(last || last != undefined){
            query.limit(2);
        }

        //lista todos los articulos de mas nuevo a mas viejo
        query.sort('-_id').exec((error, articles) => {

            if(error){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al listar los articulos'
                });
            }

            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });

        });
       
    },


    //guardar un nuevo articulo
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
    },

    //mostrar un articulo
    getArticle: (req, res) => {

        var articleId = req.params.id;

        if(!articleId || articleId== null){
            return res.status(404).send({
                status: 'error',
                message: 'El articulo no existe'
            });

        }

        Article.findById(articleId, (error, article) => {
            if(error){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en el servidor'
                });  
            }

            if(!article){
                return res.status(404).send({
                    status: 'error',
                    message: 'El articulo no existe'
                });  
            }

            return res.status(200).send({
                status: 'success',
                article
            });
        });
    },

    update: (req, res) => {

        var articleId = req.params.id;
        var params = req.body;

        if(!articleId || articleId== null){
            return res.status(404).send({
                status: 'error',
                message: 'El articulo no existe'
            });

        }

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

            Article.findOneAndUpdate({_id:articleId}, params, {new:true}, (error, articleUpdated)  => {

                if(error){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en el servidor'
                    });
                }

                if(!articleUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'NO existe el articulo'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
    
            });
        }else {
            return res.status(200).send({
                status: 'error',
                message: 'Datos no son validos'
            });
        }
    },

    delete: (req, res) => {

    }


};

module.exports = controller;