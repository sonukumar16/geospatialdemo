'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.router',
  'myApp.view1',
  'myApp.services'
]).
config( function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('/view1', {
  			url: '/view1',
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
  $urlRouterProvider.otherwise( '/view1');
});