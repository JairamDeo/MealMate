const express = require('express')
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    let finalPrice = req.body.finalPrice;  // Get the finalPrice from the request body

    // Add the order_date at the start of the order_data array
    await data.splice(0, 0, { Order_date: req.body.order_date, finalPrice: finalPrice }); // Add finalPrice here

    // If email not existing in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email });
    console.log(eId);
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            console.log(error.message);
            res.send("Server Error", error.message);
        }
    } else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true });
                });
        } catch (error) {
            res.send("Server Error", error.message);
        }
    }
});



router.post('/myorderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email })
        res.json({ orderData: myData })
    } catch (error) {
        res.send("Error", error.message)
    }
})

module.exports = router;