'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:userPreferences
 * @description
 * # userPreferences
 */
angular.module('stockTrackAngularJsApp')
  .directive('userPreferences', function () {
    return {
      scope: {
        user: '='
      },
      templateUrl: 'views/directives/user-preferences.html',
      restrict: 'E',
      controller: function() {

      }
    };
  });
