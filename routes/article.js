'use strict'

var express = require('express');
var articleController = require('../controllers/article');

var router = express.Router();

router.get('/', articleController.raiz);

router.get('/articles', articleController.getArticles);
router.get('/articles/:last?', articleController.getArticles);
router.post('/save', articleController.save);
router.get('/article/:id', articleController.getArticle);

module.exports = router;