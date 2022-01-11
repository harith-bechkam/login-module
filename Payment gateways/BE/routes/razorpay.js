const router = require('express').Router();
// const { request } = require('express');
const Razorpay = require('razorpay');
require('dotenv').config();


const request = require('request');
// ---------------
//   RAZORPAY
// ---------------
const razorInstance = new Razorpay({
    key_id: process.env.razorIdKey,
    key_secret: process.env.razorIdSecret
})

router.get('/order', (req, res) => {
    try {
        const options = {
            amount: 30 * 100,
            currency: 'INR',
            receipt: 'receipt#1',
            payment_capture: 0, //1
        };
        razorInstance.orders.create(options, async function (err, order) {
            if (err) {
                return res.status(500).json({
                    message: "Something error"
                })
            }
            return res.status(200).json(order)
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Something error" })
    }

});

// router.post('/capture/:paymentId', (req, res) => {
//     try {
//         return request(
//             {
//                 method: "POST",
//                 url: `https://rzp_test_OVZ8FGFxe1NGCQ:0Hlb4dFU4jqBKaaxkMtjLBHa@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
//                 form: {
//                     amount: 10 * 100,
//                     currency: "INR"
//                 },
//             },
//             async function (err, response, body) {
//                 if (err) {
//                     return res.status(500).json({
//                         message: "Something error!s"
//                     })
//                 }
//                 return res.status(200).json(body)
//             }
//         )
//     }
//     catch (err) {
//         return res.status(500).json({
//             message: err.message
//         })
//     }
// });

router.post("/capture/:paymentId", (req, res) => {
    try {
        return request(
            {
                method: "POST",
                url: `https://${process.env.razorIdKey}:${process.env.razorIdSecret}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
                form: {
                    amount: 30 * 100,
                    currency: "INR"
                },
            },
            async function (err, response, body) {
                if (err) {
                    return res.status(500).json({
                        message: "Something error!s"
                    })
                }
                return res.status(200).json(body)
            }
        )
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router;