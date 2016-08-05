'use strict';


  angular.module('folianApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $resourceProvider) {
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    console.log($locationProvider)
    $urlRouterProvider.otherwise('/login')
    $stateProvider
      .state('login',{
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('root',{
        url: '',
        abstract: true,
        views: {
          'header': {
            templateUrl: 'views/layouts/header.html',
            controller: 'HeaderCtrl'
          },
          // 'footer':{
          //   templateUrl: '/views/layouts/footer.html',
          //   controller: 'FooterCtrl'
          // },
          'sidebar':{
            templateUrl: 'views/layouts/sidebar.html',
            controller: 'SidebarCtrl'
          }
        }
      })


      .state('root.profile',{
        url: '/profile',
        ncyBreadcrumb: {
          label: "Добавить пользователя",
          skip: true
        },
        views: {
          'container@': {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl'
          }
        }
      })

      .state('root.userAdd', {
        url: '/usersAdd',
        ncyBreadcrumb: {
          label: "Добавить пользователя",
          skip: true
        },
        views: {
          'container@': {
            templateUrl: '/views/userAdd.html',
            controller:  'MainCtrl'
          }
        }
      })

      .state('root.materialAdd', {
        url: '/materialAdd',
        ncyBreadcrumb: {
          label: "Добавить новый материал",
          skip: true
        },
        views: {
          'container@': {
            templateUrl: '/views/materialAdd.html',
            controller:  'MaterialCtrl'
          }
        }
      })
      .state('root.info', {
        url: '/info',
        ncyBreadcrumb: {
          label: "Полезная информация",
          skip: true
        },
        views: {
          'container@': {
            templateUrl: '/views/info.html',
            controller:  'InfoCtrl'
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
    //   .state('profile', {
    //   url: '/profile',
    //   templateUrl: 'views/layouts/sidebar.html',
    //   controller:'ProfileCtrl'
    // })
  });




