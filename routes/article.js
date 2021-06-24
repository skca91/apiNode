'use strict'

var express = require('express');
var articleController = require('../controllers/article');

var router = express.Router();

var multiparty = require('connect-multiparty');
var middleware_upload = multiparty({ uploadDir: './upload/articles'});

router.get('/', articleController.raiz);

router.get('/articles', articleController.getArticles);
router.get('/articles/:last?', articleController.getArticles);
router.post('/save', articleController.save);
router.get('/article/:id', articleController.getArticle);
router.put('/article/:id', articleController.update);
router.delete('/article/:id', articleController.delete);
router.post('/upload-image/:id', middleware_upload, articleController.upload);
router.get('/get-image/:image', articleController.getImage);
router.get('/search/:search', articleController.search);

module.exports = router;