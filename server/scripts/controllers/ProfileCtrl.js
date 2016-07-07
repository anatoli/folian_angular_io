/**
 * Created by Anatoli on 04.07.2016.
 */
'use strict';

angular.module('folianApp')
  .controller('ProfileCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.name = 'Первый посетитель!!!';
  });
