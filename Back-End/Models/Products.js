const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const phonesSchema = Schema ({
    phoneName:String,
    model:String,
    color:String,
    price:String,
},{timestamps:true})

const phone = model ( 'phone',phonesSchema,'Products')
module.exports = phone;