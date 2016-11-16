/**
 * Created by Anatoli on 05.09.2016.
 */
/**
 * Created by Anatoli on 11.07.2016.
 */
'use strict';

angular.module('folianApp')
  .controller('PaintingsCtrl', ['$scope', '$location', '$rootScope', '$state', 'Material', 'NgTableParams',
    function ($scope, $location, $rootScope, $state, Material, NgTableParams) {

      var self = this;
      self.tableParams = new NgTableParams(
        {dataset:
          Material.query(
            null,
            function (response) {
              $scope.materials = response;
              if ($scope.materials){
                $scope.visible=true;

              }else{
                $scope.visible=false;
              }
            },
            function (err) {
              console.log(err +"data ne proshla")
            }
          )
        }
      );

      self.selectedPageSizes = self.tableParams.settings().counts;
      self.availablePageSizes = [5, 10, 15, 20, 25, 30, 40, 50, 100];
      self.changePage = changePage;
      self.changePageSize = changePageSize;
      self.changePageSizes = changePageSizes;

      function changePage(nextPage){
        self.tableParams.page(nextPage);
      }

      function changePageSize(newSize){
        self.tableParams.count(newSize);
      }

      function changePageSizes(newSizes){
        // ensure that the current page size is one of the options
        if (newSizes.indexOf(self.tableParams.count()) === -1) {
          newSizes.push(self.tableParams.count());
          newSizes.sort();
        }
        self.tableParams.settings({ counts: newSizes});
      }


    }]);
