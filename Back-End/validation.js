const validator = require('express-validator');




const confirmPass = (value, { req }) => {
    if(value !== req.body.password){
        throw new Error('Fehler: Passwort nicht gleich!');
    }
    return true;
}
const emailValidation = validator.body('email').isEmail().trim();
const passValidation = validator.body('password').isLength({ min: 8, max: 16 });
const confirmPassVal = validator.body('passwordConfirmation').custom(confirmPass);
module.exports = {
    emailValidation,
    passValidation,
    confirmPassVal,
    confirmPass
};