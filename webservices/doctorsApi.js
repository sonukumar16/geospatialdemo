const Doctor = require('../models/doctor');
const accountSid = 'AC0674122c981e147fd9c90f30e6069d6f';
const authToken = 'bd04070a7fbff3943bbabc825da81426';
const fs = require('fs');
const path  = require('path');

const twilio = require('twilio')(accountSid, authToken);

module.exports = {	
	register_doctor:(req,res)=>{
		console.log('register_doctor--->>',JSON.stringify(req.body));		
		Doctor.create(req.body,(err,success)=>{
			if(err){
				console.log('Error-->>',err);
				if(err.code == 11000){
				  return res.json({'response_code':404,'response_message':'This email is already registered.'});
				}
				return res.json({'response_code':500,'response_message':'Internal server error.',error:err});
			}
			else{
				return res.json({'response_code':200,'response_message':'Successfully Registered.'});
			}
		});
	},
	fetch_doctors:(req,res)=>{
		console.log('fetch_doctors--->>',JSON.stringify(req.body));
			Doctor.find({ location:{ $geoWithin: { $centerSphere: [ req.body.lon_lat, 10 / 6378.1 ] } } },(err,success)=>{
				if(err){
				 return	res.json({'response_code':500,'response_message':'Internal server error.',error:err});
				}
				else if(!success.length){
					return res.json({'response_code':404,'response_message':'No doctors available on these areas.'});
				}
				else{
					return res.json({'response_code':200,'response_message':'Successfully get doctors.',result:success});
				}
			});
	},
	test:(req,res)=>{		
		let filename = path.join(__dirname,'twiML','test.xml');
		console.log('filename ',filename);
		twilio.calls.create(
		  {
		    url: filename,
		    to: '+918081663629',
		    from: '+13042442253',
		  },
		  (err, call) => {
		  	console.log('Error',err);
		  	console.log('call-->',call);
		    process.stdout.write(call.sid);
		  });
	},	
};