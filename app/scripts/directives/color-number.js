'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:colorNumber
 * @element div
 * @function
 *
 * @description
 * Resize textarea automatically to the size of its text content.
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
