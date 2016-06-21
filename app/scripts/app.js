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
    'ngMaterial',
    'ngMessages',
    'md.data.table',
    'ngMdIcons',
    'svgArtistApp',
    'svgChartsApp'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/routes/main.html',
        bindToController: true,
        controllerAs: '$ctrl',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // Loading Interceptor
    $httpProvider.interceptors.push('LoadingInterceptor');

  })
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.alwaysWatchTheme(true);
  });
