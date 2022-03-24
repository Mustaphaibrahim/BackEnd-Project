const express = require('express')
require ('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path');
const cors = require('cors');



app.use(cookieParser());
const UserRouter = require('./Routes/UserRoutes.js')
const ProductRouter = require('./Routes/ProductsRoutes')

app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header
    (
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET")
    next();
});

const db_url = `${process.env.DB_URL}/${process.env.DB_NAME}`
const port = process.env.PORT

app.use('/static', express.static(path.join(__dirname, '../dist'), { index: false }));

app.get('/', (req, res) => {

    
    res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))

})

mongoose.connect(db_url)
.then(connect => {
    console.log('Connected with mongodb');
})
.catch(err => {err.message})

app.use('/users', UserRouter)

app.use('/products', ProductRouter)

app.use('/users/login', UserRouter)

app.use('/users/logout', UserRouter)

app.use('/products/id', ProductRouter)





app.listen(port,()=>{
    console.log('Server Running Under Port:', port);
})


