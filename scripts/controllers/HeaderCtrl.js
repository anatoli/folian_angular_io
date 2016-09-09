/**
 * Created by Anatoli on 11.07.2016.
 */
'use strict';

angular.module('folianApp')
  .controller('HeaderCtrl', ['$scope', '$state', '$rootScope', "$http", 'User',
    function ($scope, $state, $rootScope, $http, User) {


      User.get(null, function (response) {
          $scope.user = response.user;
        console.log("data proshla")
        console.log(response);
      }, function (err) {
        console.log(err +"data ne proshla")
      })

      $scope.logout = function() {
        $http({
          method: 'GET',
          url: '/logout'
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });

      };
      // $scope.openBar = function () {
      //   visible = !visible;
      //   $rootScope.$emit('rootScope:emit', visible);
      // };
      $scope.state= function () {
        $state.go('root.login')
      }



    }
  ]);
