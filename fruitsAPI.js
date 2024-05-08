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
        const { name, weight } = req.body;
        
        const fruit = new modelFruit({
            name: name,
            weight: weight
        });

        const result = await fruit.save();
        
        if (result) {
            res.json({ status: 1, message: "Dữ liệu đã được lưu vào cơ sở dữ liệu thành công." });
        } else {
            res.json({ status: 0, message: "Lưu dữ liệu vào cơ sở dữ liệu thất bại." });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;