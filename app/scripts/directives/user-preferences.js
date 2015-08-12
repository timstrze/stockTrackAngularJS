'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:userPreferences
 * @description
 * # userPreferences
 */
angular.module('stockTrackAngularJsApp')
  .directive('userPreferences', function ($interval, SymbolList) {
    return {
      scope: {
        user: '='
      },
      templateUrl: 'views/directives/user-preferences.html',
      restrict: 'E',
      controller: function($scope) {

        $scope.symbolRefreshChange = function() {
          $interval.cancel(SymbolList.interval);

          if($scope.user.Preferences.refreshState) {
            SymbolList.interval = $interval( function(){ SymbolList.refreshSymbols(); }, $scope.user.Preferences.refreshRate);
          }

        };

      }
    };
  });
