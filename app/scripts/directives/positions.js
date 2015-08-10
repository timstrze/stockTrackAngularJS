'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:positions
 * @description
 * # positions
 */
angular.module('stockTrackAngularJsApp')
  .directive('positions', function () {
    return {
      scope: {
        positions: "="
      },
      templateUrl: 'views/directives/positions.html',
      restrict: 'E',
      controller: function () {

      }
    };
  });
