'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:user-preferences
 * @element user-preferences
 * @restrict E
 *
 * @description
 * # userPreferences
 *
 * @param {Object} user User Object containing Preferences
 */
angular.module('stockTrackAngularJsApp')
  .directive('userPreferences', function (SymbolList) {
    return {
      scope: {
        user: '='
      },
      templateUrl: 'views/directives/user-preferences.html',
      restrict: 'E',
      controller: function($scope, $interval) {


        /**
         * @ngdoc function
         * @name symbolRefreshChange
         * @methodOf stockTrackAngularJsApp.directive:user-preferences
         *
         * @description
         * Updates the User Preferences of a refresh change. Remove the window.setInterval stored on the SymbolList.
         * Sets the refresh interval for the Symbol List. Refresh rate is a {Number} in milliseconds.
         *
         */
        $scope.symbolRefreshChange = function() {
          // Remove the window.setInterval stored on the SymbolList
          $interval.cancel(SymbolList.interval);
          // Check to see if the refresh state is turned on
          if($scope.user.Preferences.refreshState) {
            // Set the refresh interval for the Symbols
            SymbolList.interval = $interval(function(){
              // Call the refresh method
              SymbolList.refreshSymbols();
            },
            // Set the time of the refresh {Number} in milliseconds
            $scope.user.Preferences.refreshRate);
          }
        };
      }
    };
  });
