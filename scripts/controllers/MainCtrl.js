'use strict';

angular.module('folianApp')
  .controller('MainCtrl',['$scope', '$location', '$rootScope', '$state', 'User',
    'NgTableParams',
    function ($scope, $location, $rootScope, $state, User, NgTableParams) {

    $scope.userAdd = function(){
      User.save($scope.user, function (data) {
        console.log("Юзер создан")
      })
      }


    }]);
