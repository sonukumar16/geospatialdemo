const Doctor = require('../models/doctor');

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
	}
};