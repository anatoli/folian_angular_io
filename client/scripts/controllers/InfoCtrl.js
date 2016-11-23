/**
 * Created by Anatoli on 11.07.2016.
 */
'use strict';

angular.module('folianApp')
  .controller('InfoCtrl', ['$scope', '$state', '$rootScope', "$http",
    function ($scope, $state, $rootScope, $http) {

      $scope.$watch('company.$pristine' , function () {
        $scope.compamyStatus = $scope.company.$pristine
      })

    }
  ]);
