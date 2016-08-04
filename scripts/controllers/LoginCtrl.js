/**
 * Created by Anatoli on 11.07.2016.
 */
'use strict';

angular.module('folianApp')
  .controller('LoginCtrl', ['$scope', '$state', '$rootScope', "$http", 'Login',
    function ($scope, $state, $rootScope, $http, Login) {

      var visible = false;
      $scope.loginGet = function () {
        Login.get(null,{user:$scope.login, password: $scope.password}, function (response) {
          if(response){
            console.log(response);
            $state.go('root.profile');
          }
        })

      }




    }
  ]);

