

'use strict';


var resources = angular.module('folianApp');
resources
  .factory('User2',['$resource', '$http',  function ($resource, $http) {
    var factory = {};

    factory.multiply = function(a, b) {
      return a * b
    }
    console.log($resource);
    return factory;
  }])

  .factory('User', ['$resource', function ($resource) {
    return $resource('/api/User', {
      // create: { method: 'POST', isArray: false },
    });
  }])
  .factory('Login', ['$resource', function ($resource) {
    return $resource('/api/login', {
      // create: { method: 'POST', isArray: false }

    })
  }]);
