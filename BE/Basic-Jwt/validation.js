const { check } = require('express-validator');


exports.validateUserSignUpfields = [
    check('name').trim().notEmpty().withMessage('Name is empty!').isString().isLength({ min: 3, max: 20 }).withMessage('Name must be within 3 to 20 characters!'),
    check('email').trim().isEmail().withMessage('Invalid email!'),
    check('password').trim().notEmpty().withMessage('password is empty!').isLength({ min: 5, max: 20 }).withMessage('password must be 5 to 20 characteres long!')
]

exports.validateUserLoginfields = [
    check('email').trim().isEmail().withMessage('Invalid email!'),
    check('password').trim().notEmpty().withMessage('password is empty!').isLength({ min: 5, max: 20 }).withMessage('password must be 5 to 20 characteres long!')
]

// module.exports = {validateUserSignUpfields};