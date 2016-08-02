/**
 * Created by Anatoli on 11.07.2016.
 */
'use strict';

angular.module('folianApp')
  .controller('SidebarCtrl', ['$scope', '$location', '$rootScope',
    function ($scope, $location, $rootScope) {

      function modalWindow() {
        var uibModal = $uibModal.open({
          animation: false,
          size: 'my',
          templateUrl: 'views/modals/sidebar_modal.html',
          controller: function ($scope, $uibModalInstance) {
            $scope.$index = 0;
            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
          }
        });

        uibModal.rendered.then(function () {
          setTimeout(function () {
            $('#submenu_' + $scope.side_id).collapse();
          }, 500)
          // $('#submenu_'+$scope.side_id).collapse();
        });
      };

      $scope.visible = false;

      $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
      };
      $rootScope.$on('rootScope:emit', function (event, data) {
        $scope.side_id = ''
        modalWindow();


      });
      $scope.openBarTab = function (id) {
        $scope.side_id = id;
        modalWindow();
      }

  }]);
