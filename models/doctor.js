const mongoose = require('mongoose');
global.Promise = mongoose.Promise;
const Schema = mongoose.Schema;

let doctorSchema = new Schema({
	name:{type:String},
	email:{type:String,lowercase:true, unique:true},	
	description:{type:String},
	address:{type:String},
	location :{
		type:{type: String,default:"Point"},
		coordinates: [Number]	
	},
	status:{type:String, default:'ACTIVE'}
},{timestamps:true});

doctorSchema.index ({ "location": "2dsphere" });
module.exports = mongoose.model('doctor',doctorSchema);
