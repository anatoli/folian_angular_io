

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
    return $resource('/api/User',{
      query : { method:'GET', params:{}, isArray:true}
    });
  }])
  .factory('Dealers', ['$resource', function ($resource) {
    return $resource('/api/Dealers',{
      query : { method:'GET', params:{}, isArray:true}
    });
  }])
  .factory('Material', ['$resource', function ($resource) {
    return $resource('/api/MaterialPolotno',{
      query : { method:'GET', params:{}, isArray:true}
    });
  }])
  .factory('Acessories', ['$resource', function ($resource) {
    return $resource('/api/MaterialAcessories',{
      query : { method:'GET', params:{}, isArray:true}
    });
  }])
  .factory('Login', ['$resource', function ($resource) {
    return $resource('/api/login', {login:'@login'}/*, {
      get: { method: 'POST', isArray: true }
    }*/)
  }]);
