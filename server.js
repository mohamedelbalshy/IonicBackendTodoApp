const express = require('express');
const morgan = require('morgan');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser');
const helmet = require('helmet');
var config = require('./config/secret');


var app = express();
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    app.use(errorhandler());
}

var port = process.env.PORT || 3000

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useNewUrlParser: true});
app.use(require('./routes/todos'));

http.createServer(app).listen(port, (err)=>{
    if(err){
        console.log('Error ', err)
    }
    else{
        console.log('Server is Runnung on Port ', port);
    }
    
})