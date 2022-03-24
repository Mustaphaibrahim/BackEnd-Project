const router =require ('express').Router();
const validator = require('express-validator');

const {
    emailValidation,
    passValidation,
    confirmPassVal,
} =require('../validation')

const {
    userGetController,
    userPostController,
    userPostLogInController,
    authorize,
    userLogOutController
} = require('../Controllers/UserController')

router.route('/')
.get(userGetController)

.post(
    emailValidation,
    passValidation,
    confirmPassVal,
    userPostController,
    )
    router.route('/login')
    .post(userPostLogInController)

router.route('/logout')
.post(
    userLogOutController
)

module.exports = router;


