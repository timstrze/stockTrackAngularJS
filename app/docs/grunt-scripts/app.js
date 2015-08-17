'use strict';

/**
 * @ngdoc overview
 * @name stockTrackAngularJsApp
 * @description
 * # stockTrackAngularJsApp
 *
 * Main module of the application.
 */
angular
  .module('stockTrackAngularJsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngMessages',
    'LocalStorageModule',
    'ngMdIcons'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/'
      });

    // Loading Interceptor
    $httpProvider.interceptors.push('LoadingInterceptor');

  })
//  .config(function ($mdThemingProvider) {
//    // Configure a dark theme with primary foreground yellow
//    $mdThemingProvider.theme('docs-dark', 'default')
//      .primaryPalette('yellow')
//      .dark();
//  })
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('staja');
  }]);
