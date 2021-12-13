const router = require('express').Router();
const User = require('../model/User');
const {
    validateUserSignUpfields,
    validateUserLoginfields
} = require('../validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//REGISTER
router.post('/register', validateUserSignUpfields, async (req, res) => {

    //If there is any error in register input fields it will display the required error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array()
        return res.status(400).json({
            success: false,
            errors: err[0].msg
        });
    }

    //Checking if the registered email id is already present in Db or not.If present means we shouldn't allow the user to register else we can allow the user to register process
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).json({ error: 'Email already exists!' })

    //Hasing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //registerd users datas are pushed into Mongo DB
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.status(200).json({
            success: true,
            message: 'Registered successfully',
            registeredUserId: user._id,
        })

    } catch (err) {
        res.status(400).send({ error: `${err}` });
    }

})

//LOGIN
router.post('/login', validateUserLoginfields, async (req, res) => {

    //If there is any error in Login input fields it will display the required error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array()
        return res.status(400).json({
            success: false,
            errors: err[0].msg
        });
    }

    //Checking if the Login email-id is already present in Db or not.If present means we allow the user to login(that particular user all properties will store into "user") else we can throw error
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ error: 'Email does not exists!/ Email or password is wrong!/ Email is not found!' })

    //checking user entered password and Db stored password is same or not.if same means we can allow the user to login else we can throw error
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).json({ error: 'Invalid Password' })



    //Assigning a token for logging user
    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET)
    res.header('auth-token', token)//setting token in header
 
    res.json({
        success: true,
        message: 'Logged in successfully',
        loginUserId: user._id,
        accessToken:token
    })
});






module.exports = router;