const mongoose = require('mongoose');
global.Promise = mongoose.Promise;
const Schema = mongoose.Schema;

let doctorSchema = new Schema({
	name:{type:String},
	email:{type:String,lowercase:true,unique:true},
	description:{type:String},
	location :{
		type:'Point',
		coordinates:[]
	}
},{timestamps:true});
doctorSchema.index ({ "location": "2dsphere" });
module.exports = mongoose.module('doctor',doctorSchema);
