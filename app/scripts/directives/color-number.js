'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:color-number
 * @element color-number
 * @restrict E
 *
 * @description
 * Display the number with a positive or negative class.
 *
 * @param {Number} number Number to test if positive or negative
 */
angular.module('stockTrackAngularJsApp')
  .directive('colorNumber', function () {
    return {
      scope: {
        number: '='
      },
      templateUrl: 'views/directives/color-number.html',
      restrict: 'E'
    };
  });
