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

// Lưu trữ tạm thời dữ liệu từ các client
// const queue = []; // Khởi tạo một hàng đợi để lưu trữ các yêu cầu từ client

// router.post('/receive_fruits', async function (req, res) {
//     try {
//         const { name, weight } = req.body;

//         console.log("name", name);
//         console.log("weight", weight);

//         if (name !== undefined || weight !== undefined) {
//             // Tạo một yêu cầu từ client hiện tại
//             const clientRequest = { name, weight };

//             // Đưa yêu cầu vào hàng đợi
//             queue.push(clientRequest);

//             // Kiểm tra xem đã có đủ dữ liệu từ hai client chưa
//             if (queue.length >= 2) {
//                 const firstClientRequest = queue.shift(); // Lấy yêu cầu từ client đầu tiên trong hàng đợi
//                 const secondClientRequest = queue.shift(); // Lấy yêu cầu từ client thứ hai trong hàng đợi

//                 // Tạo và lưu trữ trái cây vào cơ sở dữ liệu
//                 const fruit = new modelFruit({
//                     name: firstClientRequest.name,
//                     weight: secondClientRequest.weight
//                 });
//                 const result = await fruit.save();

//                 if (result) {
//                     res.json({ status: 1, message: "Dữ liệu đã được lưu vào cơ sở dữ liệu thành công." });
//                 } else {
//                     res.json({ status: 0, message: "Lưu dữ liệu vào cơ sở dữ liệu thất bại." });
//                 }
//             } else {
//                 // Trả về thành công nhưng không lưu vào cơ sở dữ liệu vì chưa nhận đủ dữ liệu từ cả hai client
//                 res.json({ status: 1, message: "Dữ liệu đã được nhận thành công. Đang chờ dữ liệu từ client khác." });
//             }
//         } else {
//             res.status(400).json({ error: 'Bad Request - Thiếu thông tin về tên hoặc trọng lượng của trái cây.' });
//         }
//     } catch (error) {
//         console.error("Error occurred:", error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
let tempData = {}; // Biến tạm để lưu trữ dữ liệu từ mỗi client

router.post('/receive_fruits', async function (req, res) {
    try {
        const { name, weight } = req.body;

        console.log("name", name);
        console.log("weight", weight);

        if (name !== undefined || weight !== undefined) {
            if (name !== undefined && weight === undefined) {
                tempData.name = name;
            }
            if (weight !== undefined && name === undefined) {
                tempData.weight = weight;
            }
            
            if (tempData.name !== undefined && tempData.weight !== undefined) {
                const fruit = new modelFruit({
                    name: tempData.name,
                    weight: tempData.weight
                });
                const result = await fruit.save();

                if (result) {
                    res.json({ status: 1, message: "Dữ liệu đã được lưu vào cơ sở dữ liệu thành công." });
                } else {
                    res.json({ status: 0, message: "Lưu dữ liệu vào cơ sở dữ liệu thất bại." });
                }
                
                tempData = {};
            } else {
                res.json({ status: 1, message: "Dữ liệu đã được nhận thành công. Đang chờ dữ liệu từ client khác." });
            }
        } else {
            res.status(400).json({ error: 'Bad Request - Thiếu thông tin về tên hoặc trọng lượng của trái cây.' });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





module.exports = router;