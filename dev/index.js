(function () {

  "use strict";

  require('angular');  
  require('angular-route');
  
  var routes = require('./routes.js');

  var myApp = angular.module('myApp', ['ngRoute']);

  myApp.config(routes);

  return myApp;

}());