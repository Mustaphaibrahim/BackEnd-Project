const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const userSchema = Schema ({
    username:String,
    password:String,
    email:String,
},{timestamps:true})


const user = model ( 'user',userSchema,'Users')
module.exports = user;