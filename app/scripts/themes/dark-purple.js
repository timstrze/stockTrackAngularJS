'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.service:Constants
 * @description
 * # Constants
 * Contains various properties and methods for the app.
 *
 */
angular.module('stockTrackAngularJsApp')
.config(function ($mdThemingProvider) {
  var customPrimary = {
    '50': '#61698e',
    '100': '#565e7f',
    '200': '#4c536f',
    '300': '#424860',
    '400': '#373c51',
    '500': '#2D3142',
    '600': '#232633',
    '700': '#181a24',
    '800': '#0e0f14',
    '900': '#040405',
    'A100': '#6d769b',
    'A200': '#7c84a6',
    'A400': '#8b92b0',
    'A700': '#000000',
    'contrastDefaultColor': 'light'
  };
  $mdThemingProvider
    .definePalette('customPrimary',
      customPrimary);

  var customAccent = {
    '50': '#9b390f',
    '100': '#b34211',
    '200': '#ca4a13',
    '300': '#e15315',
    '400': '#eb6125',
    '500': '#ed723d',
    '600': '#f1946b',
    '700': '#f3a583',
    '800': '#f6b69a',
    '900': '#f8c7b1',
    'A100': '#f1946b',
    'A200': '#EF8354',
    'A400': '#ed723d',
    'A700': '#fad8c9'
  };
  $mdThemingProvider
    .definePalette('customAccent',
      customAccent);

  var customWarn = {
    '50': '#ffa780',
    '100': '#ff9566',
    '200': '#ff834d',
    '300': '#ff7133',
    '400': '#ff601a',
    '500': '#FF4E00',
    '600': '#e64600',
    '700': '#cc3e00',
    '800': '#b33700',
    '900': '#992f00',
    'A100': '#ffb899',
    'A200': '#ffcab3',
    'A400': '#ffdccc',
    'A700': '#802700'
  };
  $mdThemingProvider
    .definePalette('customWarn',
      customWarn);

  var customBackground = {
    '50': '#909db4',
    '100': '#8090aa',
    '200': '#71829f',
    '300': '#647593',
    '400': '#596984',
    '500': '#4F5D75',
    '600': '#455166',
    '700': '#3a4557',
    '800': '#303947',
    '900': '#262d38',
    'A100': '#9faabe',
    'A200': '#aeb8c8',
    'A400': '#bdc5d3',
    'A700': '#1c2029'
  };
  $mdThemingProvider
    .definePalette('customBackground',
      customBackground);

  $mdThemingProvider.theme('darkPurple')
    .primaryPalette('customPrimary')
    .accentPalette('customAccent')
    .warnPalette('customWarn')
    .backgroundPalette('customBackground')
});
