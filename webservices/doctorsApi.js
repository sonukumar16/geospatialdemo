const Doctor = require('../models/doctor');

module.exports = {

	
	signup:(req,res)=>{
		console.log('signup--->>',JSON.stringify(req.body));
		let obj = {

		}
		Doctor.create(req.body,(err,success)=>{
			if(err){
				res.json({'response_code':500,'response_message':'Internal server error.'});
			}
			else{
				res.json({'response_code':200,'response_message':'Successfully signup.'});
			}
		})
	},
	fetch_doctors:(req,res)=>{
		console.log('fetch_doctors--->>',JSON.stringify(req.body));
			Doctor.find({ location:{ $geoWithin: { $centerSphere: [ req.body.lon_lat, 10 / 6378.1 ] } } },(err,success)=>{
				if(err){
					res.json({'response_code':500,'response_message':'Internal server error.',error:err});
				}
				else if(!success.length){
					res.json({'response_code':404,'response_message':'No data found.'});
				}
				else{
					res.json({'response_code':200,'response_message':'Successfully get doctors.',result:success});
				}
			});
	}
};