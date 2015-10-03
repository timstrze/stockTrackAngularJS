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
        templateUrl: 'views/routes/main.html',
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
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('staja');
  }])
  .config(function($mdThemingProvider) {
    var customPrimary = {
      '50': '#80dfff',
      '100': '#66d9ff',
      '200': '#4dd2ff',
      '300': '#33ccff',
      '400': '#1ac5ff',
      '500': '#00BFFF',
      '600': '#00ace6',
      '700': '#0099cc',
      '800': '#0086b3',
      '900': '#007399',
      'A100': '#99e5ff',
      'A200': '#b3ecff',
      'A400': '#ccf2ff',
      'A700': '#006080'
    };
    $mdThemingProvider
      .definePalette('customPrimary',
      customPrimary);

    var customAccent = {
      '50': '#3636d2',
      '100': '#2c2cc3',
      '200': '#2727af',
      '300': '#22229a',
      '400': '#1e1e85',
      '500': '#191970',
      '600': '#14145b',
      '700': '#101046',
      '800': '#0b0b31',
      '900': '#06061d',
      'A100': '#4b4bd7',
      'A200': '#6060dc',
      'A400': '#7575e0',
      'A700': '#020208'
    };
    $mdThemingProvider
      .definePalette('customAccent',
      customAccent);

    var customWarn = {
      '50': '#ffb280',
      '100': '#ffa266',
      '200': '#ff934d',
      '300': '#ff8333',
      '400': '#ff741a',
      '500': '#ff6400',
      '600': '#e65a00',
      '700': '#cc5000',
      '800': '#b34600',
      '900': '#993c00',
      'A100': '#ffc199',
      'A200': '#ffd1b3',
      'A400': '#ffe0cc',
      'A700': '#803200'
    };
    $mdThemingProvider
      .definePalette('customWarn',
      customWarn);

    var customBackground = {
      '50': '#ffffff',
      '100': '#ffffff',
      '200': '#ffffff',
      '300': '#f5f5f5',
      '400': '#e9e9e9',
      '500': '#DCDCDC',
      '600': '#cfcfcf',
      '700': '#c2c2c2',
      '800': '#b6b6b6',
      '900': '#a9a9a9',
      'A100': '#ffffff',
      'A200': '#ffffff',
      'A400': '#ffffff',
      'A700': '#9c9c9c'
    };
    $mdThemingProvider
      .definePalette('customBackground',
      customBackground);

    //$mdThemingProvider.theme('default')
    //  .primaryPalette('customPrimary')
    //  .accentPalette('customAccent')
    //  .warnPalette('customWarn')
    //  .backgroundPalette('customBackground')
  });
