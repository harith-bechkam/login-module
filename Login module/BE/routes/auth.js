const router = require('express').Router();
const User = require('../model/User');
const {
    validateUserSignUpfields,
    validateUserLoginfields,
    validateUserForgotPasswordFields,
    validateUserResetPasswordFields
} = require('../validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sendEmail = require('../sendEmail');
require('dotenv').config();


const createJwt = (id) => {

    //Assigning a token for logging user
    const token = jwt.sign({ _id: id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '100s' })
    return token
}

//REGISTER
router.post('/register', validateUserSignUpfields, async (req, res) => {

    //If there is any error in register input fields it will display the required error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array()
        return res.status(400).json({
            success: false,
            error: err[0].msg
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

        const token = createJwt(user._id)
        res.header('auth-token', token)//setting token in header

        res.status(200).json({
            success: true,
            message: 'Registered successfully',
            registeredUserId: user._id,
            accessToken: token
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
            error: err[0].msg
        });
    }

    //Checking if the Login email-id is already present in Db or not.If present means we allow the user to login(that particular user all properties will store into "user") else we can throw error
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ error: 'Email does not exists!/ Email or password is wrong!/ Email is not found!' })

    //checking user entered password and Db stored password is same or not.if same means we can allow the user to login else we can throw error
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).json({ error: 'Invalid Password' })

    const token = createJwt(user._id)
    res.header('auth-token', token)//setting token in header

    res.json({
        success: true,
        message: 'Logged in successfully',
        loginUserId: user._id,
        accessToken: token
    })
});

//FORGOT PASSWORD
router.post('/forgotpassword', validateUserForgotPasswordFields, async (req, res) => {

    //If there is any error in Forgot password input fields it will display the required error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array()
        return res.status(400).json({
            success: false,
            error: err[0].msg
        });
    }

    try {
        //if user enter email is present in our DB or not.if present we can proceed further else STOP 
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ success: false, error: "Email could not be sent" })
        }
        //if present we need to create string and hashit and store in that required user
        const resetToken = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordExpire = Date.now() + 10 * (60 * 1000)
        await user.save()

        //creating reseturl token
        const resetUrl = `http://login-module1.herokuapp.com/resetPassword/${resetToken}`

        //creating email stuff
        const message = `
        <h3>Use the below link to change your password</h3>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `
        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            });
            res.status(200).json({ success: true, message: "Email sented" })
        }
        catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();
            res.status(500).json({ success: false, error: "Email could not be sent" })
        }
    }
    catch (err) {
        res.status(400).json({ error: `${err}` });
    }

});

//RESET PASSWORD
router.put('/resetpassword/:resetToken', validateUserResetPasswordFields, async (req, res) => {

    //If there is any error in Forgot password input fields it will display the required error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array()
        return res.status(400).json({
            success: false,
            error: err[0].msg
        });
    }

    //Getting reseturl token from here "req.params.resetToken" and hash it and check with user's resetPasswordToken and 
    //Whether the resetPasswordExpire is having still time or not check it.If all OK then proceed further
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ success: false, error: "Invalid reset token" })
        }

        //Hasing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        res.status(201).json({ sucess: "true", message: "Password has ben successfully changed" })
    } catch (err) {
        res.status(400).json({ error: `${err}` });
    }

});

module.exports = router;