'use strict';

// Declare app level module which depends on views, and components
const app = angular.module('myApp', ['ui.router']).
config( function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider.state('search_doctor', {
  			url: '/search_doctor',
            templateUrl: 'search_doctor/search_doctor.html',
            controller: 'searchDoctorCtrl'
        })
  .state('add_doctor', {
        url: '/add_doctor',
            templateUrl: 'add_doctor/add_doctor.html',
            controller: 'addDoctorCtrl'
        });
  $urlRouterProvider.otherwise( '/search_doctor');
  
});