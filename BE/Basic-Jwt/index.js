const express = require('express');
const app = express();
require('dotenv').config()
var cors = require('cors');
const db = require('./database');

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');


//Middlewares
app.use(cors());//it enables all routes to cross origin resource sharing
app.use(express.json()); //body parser ehich is inbuiltly coming in expresss no-need to use body-parser library


//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api', postRoute);





app.listen(process.env.PORT||5000, () => { console.log(`server is running on ${process.env.PORT||5000}`) })