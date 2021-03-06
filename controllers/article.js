'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var Article = require('../models/article');
const { exists } = require('../models/article');

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
                        message: 'No existe el articulo'
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

        var articleId = req.params.id;

        Article.findOneAndDelete({_id: articleId}, (error, articleRemove) => {
            
            if(error){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en el servidor'
                });
            }

            if(!articleRemove){
                return res.status(500).send({
                    status: 'error',
                    message: 'Articulo no existe'
                });
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemove
            });
        });
    },

    upload: (req, res) => {

        var fileName = 'Imagen no subida';

        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: fileName
            });
        }

        var filePath = req.files.file0.path;
        var fileSplit = filePath.split('\\');

        var fileName = fileSplit[2];
        var extensionSplit = fileName.split('\.');
        var fileExtension = extensionSplit[1];

        if(fileExtension != 'png' && fileExtension != 'jpg' && fileExtension != 'jpeg' && fileExtension != 'gif'){

            //si no es borro el archivo
            fs.unlink(filePath, (error) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extension no es la permitida'
                });
            });

        }else{

            var articleId = req.params.id;
            Article.findOneAndUpdate({_id: articleId}, {image: fileName}, {new:true}, (error, articleUpdated) => {
                if(error || !articleUpdated){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar el articulo'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
            });
        } 
    },

    getImage : (req, res) => {

        var file = req.params.image;
        var pathFile = './upload/articles/'+file;

        fs.exists(pathFile, (exists) => {

            if(exists){
                return res.sendFile(path.resolve(pathFile));
            }else{
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe'
                });
            }
        });

    },

    search: (req, res) => {

        var search = req.params.search;

        Article.find({ "$or": [
            { "title": { "$regex" : search, "$options": "i"}},
            { "content" : { "$regex" : search, "$options": "i"}}
        ]})
        .sort([[ 'date', 'descending']])
        .exec( ( error , articles) => {

            if(error){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la peticion'
                });
            }

            if(!articles || articles.length <= 0){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos que coincidadn con tu busqueda'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        })

       

    }


};

module.exports = controller;