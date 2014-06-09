module.exports = function () {

  "use strict";

  var angular = require('angular');
  var routes = require('./routes.js');

  require('angular-router-browserify')(angular);

  var myApp = angular.module('myApp', ['ngRoute']);

  myApp.config(routes);

  return myApp;

};