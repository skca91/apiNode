'use strict'

var express = require('express');
var articleController = require('../controllers/article');

var router = express.Router();

router.get('/', articleController.raiz);

module.exports = router;