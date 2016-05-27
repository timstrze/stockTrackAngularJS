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

    $mdThemingProvider.definePalette('blueGreen0', {
      '50': '#f4fcfd',
      '100': '#b2e8f2',
      '200': '#82d9ea',
      '300': '#45c7e0',
      '400': '#2bbfdc',
      '500': '#21acc7',
      '600': '#1d95ad',
      '700': '#187f93',
      '800': '#146878',
      '900': '#10515e',
      'A100': '#f4fcfd',
      'A200': '#b2e8f2',
      'A400': '#2bbfdc',
      'A700': '#187f93',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 300 400 500 A100 A200 A400'
    });

    $mdThemingProvider.definePalette('blueGreen1', {
      '50': '#f8fcfc',
      '100': '#c1e6e4',
      '200': '#99d6d2',
      '300': '#66c2bc',
      '400': '#50b9b2',
      '500': '#43a8a1',
      '600': '#3a928c',
      '700': '#327c77',
      '800': '#296662',
      '900': '#20504d',
      'A100': '#f8fcfc',
      'A200': '#c1e6e4',
      'A400': '#50b9b2',
      'A700': '#327c77',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 300 400 500 A100 A200 A400'
    });

    $mdThemingProvider.definePalette('blueGreen2', {
      '50': '#f7f8f2',
      '100': '#d9dec0',
      '200': '#c3ca9b',
      '300': '#a7b16d',
      '400': '#9ba759',
      '500': '#89934e',
      '600': '#767f43',
      '700': '#646b39',
      '800': '#51572e',
      '900': '#3e4324',
      'A100': '#f7f8f2',
      'A200': '#d9dec0',
      'A400': '#9ba759',
      'A700': '#646b39',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 300 400 500 A100 A200 A400'
    });

    $mdThemingProvider.definePalette('blueGreen3', {
      '50': '#c5c6c5',
      '100': '#b9b9b8',
      '200': '#acadab',
      '300': '#9fa09e',
      '400': '#939491',
      '500': '#868784',
      '600': '#797a77',
      '700': '#6c6d6b',
      '800': '#60605e',
      '900': '#535451',
      'A100': '#d2d3d1',
      'A200': '#dfdfde',
      'A400': '#ececeb',
      'A700': '#464745',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 300 400 500 A100 A200 A400'
    });

    $mdThemingProvider.definePalette('blueGreen4', {
      '50': '#f8fafa',
      '100': '#cbd8da',
      '200': '#abc0c3',
      '300': '#81a1a5',
      '400': '#6f9398',
      '500': '#618388',
      '600': '#547276',
      '700': '#486164',
      '800': '#3b4f52',
      '900': '#2e3e41',
      'A100': '#f8fafa',
      'A200': '#cbd8da',
      'A400': '#6f9398',
      'A700': '#486164',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 300 400 A100 A200 A400'
    });

    $mdThemingProvider.theme('blueGreen')

      .primaryPalette('blueGreen0')

      .accentPalette('blueGreen1')


    .warnPalette('blueGreen2')
      .backgroundPalette('blueGreen4');




  });
