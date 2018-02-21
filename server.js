const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const doctorRoute = require('./routes/index');
const mongoose = require('mongoose');

mongoose.connection.openUri('mongodb://127.0.0.1/geospationDB',(err,connect)=>{
	err?console.log('Connection error',err):console.log('Successfully connection made to mongodb');
});

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'assets')));
let api = '/api/v1';
app.use(`${api}/doctor`, doctorRoute);
 
app.listen(process.env.NODE_ENV || 3000,()=> console.log(`server is listen on ${process.env.NODE_ENV || 3000}`));