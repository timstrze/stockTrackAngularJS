'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:color-number
 * @element div
 * @function
 *
 * @description
 * Display the number with a positive or negative class.
 *
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
