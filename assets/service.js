'use strict';

app.service('mainService',function($http){
	
		 this.fetchDoctors = function (data){
			return $http.post("http://172.16.6.90:3000/api/v1/doctor/fetch_doctors",data);
		};
		this.add_doctor = function (data){
			return $http.post("http://172.16.6.90:3000/api/v1/doctor/register_doctor",data);
		};
});