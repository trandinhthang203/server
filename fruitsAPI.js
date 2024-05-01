var express = require('express');
var router = express.Router();
var modelFruit = require('./fruitsModel');

router.get('/list_fruits', async function(req, res, next){
    var data = await modelFruit.find();
    res.json(data);
});

module.exports = router;