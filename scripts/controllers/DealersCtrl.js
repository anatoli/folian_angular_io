/**
 * Created by Anatoli on 05.09.2016.
 */
/**
 * Created by Anatoli on 05.09.2016.
 */
/**
 * Created by Anatoli on 11.07.2016.
 */
'use strict';

angular.module('folianApp')
  .controller('DealersCtrl', ['$scope', '$location', '$rootScope', '$state', 'NgTableParams',
    function ($scope, $location, $rootScope, $state, NgTableParams) {
      $scope.noTableData = true;
      $scope.noTableDataQ = true;

      var _defaultFilter = {
        //from: getFromDate(),
        //to: null,
        status: 'n',
        sort: 'created,id',
        dir: 'desc,desc',
        start: 0,
        count: 10
      };

      $scope.showreg = false;
      $scope.noTableData = false;
      $scope.filter = angular.extend(angular.copy(_defaultFilter));
      //$scope.filter = angular.copy(_defaultFilter);

      $scope.gridSelection = null;
      $scope.gridSelected = false;

      function reloadGrid(clearSelected){
        if(clearSelected){
          $scope.gridSelection = null;
          $scope.gridSelected = false;
        }
        $scope.configTableParams.reload();
      }

      $scope.selectTableItem = function(item) {
        // console.log("Selected CASE");
        // console.log(item);
        $scope.gridSelection = item;
        $scope.gridSelected = true;
      };


    }]);
