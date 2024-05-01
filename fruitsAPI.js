var express = require('express');
var router = express.Router();
var modelFruit = require('./fruitsModel');

router.get('/list_fruits', async function (req, res, next) {
    try {
        var data = await modelFruit.find();
        res.json({ fruits: data });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/receive_fruits', async function (req, res) {
    try {
        var { name, weight } = req.body;
        var fruit = { name, weight };
        var result = await modelFruit.create(fruit)
        console.log(result)
        if (result != null) {
            res.json({ status: 1, message: "Thanh cong" });
        } else {
            res.json({ status: 0, message: "That bai" });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;