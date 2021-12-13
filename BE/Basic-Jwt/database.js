const mongoose = require('mongoose')
require('dotenv').config();

//connect to DB
const db = mongoose.connect(process.env.DB_CONNECT, () => console.log('connected to db!'))

module.exports = db;
