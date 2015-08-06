'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:colorNumber
 * @description
 * # colorNumber
 */
angular.module('stockTrackAngularJsApp')
  .directive('colorNumber', function () {
    return {
      scope: {
        number: "="
      },
      transclude: true,
      templateUrl: 'views/directives/color-number.html',
      restrict: 'E',
      controller: function() {

      }
    };
  });
