/**
 * Created by Anatoli on 11.07.2016.
 */
'use strict';

angular.module('folianApp')
  .controller('MaterialCtrl', ['$scope', '$state', '$rootScope', "$http", "Acessories", 'NgTableParams',
    function ($scope, $state, $rootScope, $http, Acessories, NgTableParams) {

      $scope.CreateMaterials = function () {
        console.log($scope.newMaterial);
          Acessories.save($scope.newMaterial);
      }

    }]);
