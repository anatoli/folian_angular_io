'use strict';


  angular.module('folianApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    console.log($locationProvider)
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('root',{
        url: '',
        views: {
          'header': {
            templateUrl: 'views/layouts/header.html',
            controller: 'HeaderCtrl'
          },
          'sidebar':{
            templateUrl: 'views/layouts/sidebar.html',
            controller: 'SidebarCtrl'
          },
          // 'footer':{
          //   templateUrl: 'views/footer.html',
          //   controller: 'FooterCtrl'
          // },
        }
      })
      .state('root.home', {
        url: '/profile/detail',
        ncyBreadcrumb: {
          label: "Главная",
          skip: true
        },
        views: {
          'container@': {
            templateUrl: '/views/users.html',
            controller:  'MainCtrl'
          }
        }
      })
      // .state('main', {
      //   url: '/main',
      //   views:{
      //     'root': {
      //       templateUrl: 'views/users.html',
      //       controller:'MainCtrl'
      //     }
      //   }

      // })
      .state('profile', {
      url: '/profile',
      templateUrl: 'views/layouts/sidebar.html',
      controller:'ProfileCtrl'
    })
  });




