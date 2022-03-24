const user = require('../Models/Users')
const md5 = require('md5');
const validator = require('express-validator');
const jwt = require ('jsonwebtoken')

const userGetController = async (req, res)=>{
    try{
        const allUsers = await user.find()
        res.status(200).send(allUsers)
        console.log(allUsers);
    } catch(error){
        console.log(error);
    }
}

const userPostController = async (req, res)=>{
    
    const error = validator.validationResult(req).errors;
    if(error.length > 0 )
    {
        return res.status(400).json({
            success: false,
            message: error.map(err => err.msg)
        });
    }

    try {
        const newUser = new user({
            username:req.body.username,
            password:md5(req.body.password),
            email:req.body.email,
        })
        
        const addUser = await newUser.save()
        res.status(200).send(addUser)
        console.log(addUser);
    } catch (error) {
        console.log(error);
    }
}

const signAccessToken = data => {
    return jwt.sign(data,process.env.SECRET_TOKEN, {expiresIn: '20000s'});
}

const userPostLogInController = (req, res) => {
    const {email, password} = req.body
    user.findOne({ email }).then(founduser =>{
        if(founduser)
        {
            if(founduser.password === md5(password))
            {
                res.cookie( "cookie_Token",signAccessToken({ email }),
                        {
                            maxAge: 24 * 60 * 60,
                            httpOnly: true
                        }
                    ).status(200).json({
                    success:true,
                    message:founduser,
                    token: signAccessToken({ email })
                    })
            }
            else
            {
                res.status(404).json({
                    success: false,
                    message: 'password is not true'
                })
            }
        }
        else
        {
            res.status(404).json({
                success: false,
                message: 'user not found'
            })
        }
    })
}

const authorize = (req, res, next) =>
{
    const token = req.cookies.cookie_Token;
    if(!token)
    {
        res.sendStatus(403)
    }
    try
    {
        const data = jwt.verify(token, SECRET_TOKEN);
        console.log(data);
        req.email = data.email;
        next();
    }
    catch
    {
        return res.sendStatus(403)
    }
}

const userLogOutController = (req, res) =>
{
    res.clearCookie("cookie_Token")
    .status(200)
    .json({
        success: true,
        message: 'user logged out'
    })
};

module.exports = {
    userGetController,
    userPostController,
    userPostLogInController,
    authorize,
    userLogOutController
}
