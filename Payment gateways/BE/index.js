const express = require('express');
const app = express();
require('dotenv').config();
var cors = require('cors');


//Import Routes
const stripeRoute = require('./routes/stripe');
const paypalRoute = require('./routes/paypal');
const razorpayRoute = require('./routes/razorpay');

//Middlewares
app.use(cors());//it enables all routes to cross origin resource sharing
app.use(express.json()); //body parser ehich is inbuiltly coming in expresss no-need to use body-parser library

//Route Middlewares
app.use('/api', stripeRoute);
app.use('/api/payment', paypalRoute);
app.use('/api/razorpay', razorpayRoute);

// app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));

app.listen(process.env.PORT || 5000, () => { console.log(`server is running on ${process.env.PORT || 5000}`) })