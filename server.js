const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const doctorRoute = require('./routes/index');

const app = express();


app.use(bodyParser.json());
app.use(morgan('dev'));
let api = '/api/v1';
app.use(`${api}/doctor`, doctorRoute);
 
app.listen(process.env.NODE_ENV || 3000,()=> console.log(`server is listen on ${process.env.NODE_ENV || 3000}`));