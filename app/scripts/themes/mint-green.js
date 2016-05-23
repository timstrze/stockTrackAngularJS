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

    var customPrimaryMintGreen = {
      '50': '#ffffff',
      '100': '#ffffff',
      '200': '#ffffff',
      '300': '#fafdfa',
      '400': '#e7f8e6',
      '500': '#D4F2D2',
      '600': '#c1ecbe',
      '700': '#aee7aa',
      '800': '#9be197',
      '900': '#88db83',
      'A100': '#ffffff',
      'A200': '#ffffff',
      'A400': '#ffffff',
      'A700': '#75d56f'
    };
    $mdThemingProvider
      .definePalette('customPrimaryMintGreen',
        customPrimaryMintGreen);

    var customAccentMintGreen = {
      '50': '#5f4eaf',
      '100': '#6e5fb8',
      '200': '#7e70c0',
      '300': '#8e82c7',
      '400': '#9e94cf',
      '500': '#aea5d7',
      '600': '#cec9e7',
      '700': '#dedaef',
      '800': '#eeecf7',
      '900': '#fefefe',
      'A100': '#cec9e7',
      'A200': '#BEB7DF',
      'A400': '#aea5d7',
      'A700': '#ffffff'
    };
    $mdThemingProvider
      .definePalette('customAccentMintGreen',
        customAccentMintGreen);

    var customWarnMintGreen = {
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
      .definePalette('customWarnMintGreen',
        customWarnMintGreen);

    var customBackgroundMintGreen = {
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
      'A700': '#464745'
    };
    $mdThemingProvider
      .definePalette('customBackgroundMintGreen',
        customBackgroundMintGreen);

    $mdThemingProvider.theme('mintGreen')
      .primaryPalette('customPrimaryMintGreen')
      .accentPalette('customAccentMintGreen')
      .warnPalette('customWarnMintGreen')
      .backgroundPalette('customBackgroundMintGreen')
  });
