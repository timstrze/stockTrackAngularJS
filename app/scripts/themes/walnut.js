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

    $mdThemingProvider.definePalette('McgPalette0', {
      '50': '#faf7f3',
      '100': '#e2d4be',
      '200': '#d1ba97',
      '300': '#bb9966',
      '400': '#b28b51',
      '500': '#9e7b46',
      '600': '#896a3d',
      '700': '#745a33',
      '800': '#5e492a',
      '900': '#493920',
      'A100': '#faf7f3',
      'A200': '#e2d4be',
      'A400': '#b28b51',
      'A700': '#745a33',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 300 400 A100 A200 A400'
    });

    $mdThemingProvider.definePalette('McgPalette1', {
      '50': '#fbf9f6',
      '100': '#e6d9bf',
      '200': '#d6c096',
      '300': '#c2a263',
      '400': '#ba944d',
      '500': '#a78441',
      '600': '#917338',
      '700': '#7b6130',
      '800': '#655027',
      '900': '#4f3e1f',
      'A100': '#fbf9f6',
      'A200': '#e6d9bf',
      'A400': '#ba944d',
      'A700': '#7b6130',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 300 400 500 A100 A200 A400'
    });

    $mdThemingProvider.definePalette('McgPalette2', {
      '50': '#76fbfa',
      '100': '#2cf9f7',
      '200': '#07e6e3',
      '300': '#05a09f',
      '400': '#048381',
      '500': '#036564',
      '600': '#024747',
      '700': '#012a29',
      '800': '#000c0c',
      '900': '#000000',
      'A100': '#76fbfa',
      'A200': '#2cf9f7',
      'A400': '#048381',
      'A700': '#012a29',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 A100 A200'
    });

    $mdThemingProvider.definePalette('McgPalette3', {
      '50': '#5dcef8',
      '100': '#13b8f5',
      '200': '#0894c8',
      '300': '#056184',
      '400': '#044c66',
      '500': '#033649',
      '600': '#02202c',
      '700': '#010b0e',
      '800': '#000000',
      '900': '#000000',
      'A100': '#5dcef8',
      'A200': '#13b8f5',
      'A400': '#044c66',
      'A700': '#010b0e',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 A100 A200'
    });

    $mdThemingProvider.definePalette('McgPalette4', {
      '50': '#4c8df5',
      '100': '#0d61e6',
      '200': '#0a4bb1',
      '300': '#062e6e',
      '400': '#052251',
      '500': '#031634',
      '600': '#010a17',
      '700': '#000000',
      '800': '#000000',
      '900': '#000000',
      'A100': '#4c8df5',
      'A200': '#0d61e6',
      'A400': '#052251',
      'A700': '#000000',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 A100'
    });

    $mdThemingProvider.theme('blueGreen')

      .primaryPalette('McgPalette0')

      .accentPalette('McgPalette1');




  });
