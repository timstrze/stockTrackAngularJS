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
    var customPrimaryAutumn = {
      '50': '#ff713f',
      '100': '#ff5e26',
      '200': '#ff4b0c',
      '300': '#f23e00',
      '400': '#d83800',
      '500': '#BF3100',
      '600': '#a52a00',
      '700': '#8c2400',
      '800': '#721d00',
      '900': '#591700',
      'A100': '#ff8459',
      'A200': '#ff9772',
      'A400': '#ffa98c',
      'A700': '#3f1000',
      'contrastDefaultColor': 'light'
    };
    $mdThemingProvider
      .definePalette('customPrimaryAutumn',
        customPrimaryAutumn);

    var customAccentAutumn = {
      '50': '#0e1100',
      '100': '#232901',
      '200': '#394202',
      '300': '#4e5b02',
      '400': '#637403',
      '500': '#798d03',
      '600': '#a3bf05',
      '700': '#b9d805',
      '800': '#cef106',
      '900': '#d8f917',
      'A100': '#a3bf05',
      'A200': '#8EA604',
      'A400': '#798d03',
      'A700': '#dcfa2f'
    };
    $mdThemingProvider
      .definePalette('customAccentAutumn',
        customAccentAutumn);

    var customWarnAutumn = {
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
      .definePalette('customWarnAutumn',
        customWarnAutumn);

    var customBackgroundAutumn = {
      '50': '#ffde75',
      '100': '#ffd85c',
      '200': '#ffd242',
      '300': '#ffcc29',
      '400': '#ffc60f',
      '500': '#F5BB00',
      '600': '#dba800',
      '700': '#c29400',
      '800': '#a88100',
      '900': '#8f6d00',
      'A100': '#ffe48f',
      'A200': '#ffeba8',
      'A400': '#fff1c2',
      'A700': '#755a00'
    };
    $mdThemingProvider
      .definePalette('customBackgroundAutumn',
        customBackgroundAutumn);

    $mdThemingProvider.theme('autumn')
      .primaryPalette('customPrimaryAutumn')
      .accentPalette('customAccentAutumn')
      .warnPalette('customWarnAutumn')
      .backgroundPalette('customBackgroundAutumn')
  });
