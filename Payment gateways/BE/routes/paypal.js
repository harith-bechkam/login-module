const router = require('express').Router();
const paypal = require('paypal-rest-sdk');


// ---------------
//     PAYPAL
// ---------------
paypal.configure({
    'mode': 'sandbox', //to go to live use keyword 'live'
    'client_id': process.env.paypal_client_Id,
    'client_secret': process.env.paypal_client_secret
})

router.post('/paypal', (req, res) => {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://payment-gateway-node-be.herokuapp.com/api/payment/success",
            "cancel_url": "https://payment-gateway-node-be.herokuapp.com/api/payment/failure"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Red Sox Hat",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "Hat for the best team ever"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log(payment)
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
})

router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.status(200).json({ status: "SUCCESS", response: payment });
        }
    });
});

router.get('/cancel', (req, res) => res.send('Cancelled'));
router.get('/failure', (req, res) => res.send('Failure'));
module.exports = router;