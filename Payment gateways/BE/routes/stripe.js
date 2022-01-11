const router = require('express').Router();
require('dotenv').config();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.Stripe_SECRET_KEY)


// ---------------
//     STRIPE
// ---------------

//SECRET_KEY ROUTE
router.get("/", (req, res) => {
    res.send(process.env.Stripe_SECRET_KEY)
});

//STRIPE ROUTE
router.post("/payment", (req, res) => {
    const { product, token } = req.body;
    console.log(product)
    console.log("price " + product.price)

    const idempotencyKey = uuidv4()

    return stripe.customers.create({
        name: token.card.name,
        email: token.email,
        source: token.id,
    }).then(customer => {
        console.log(customer)
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,

            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            //Extra things
            // shipping: {
            //     name: token.card.name,
            //     address: {
            //         country: token.card.address_country
            //     }
            // }
        }
            , { idempotencyKey }
        )
    })
        .then(result => res.status(200).json(result))
        .catch(err => res.send(err))
});


  
//   });

module.exports = router;