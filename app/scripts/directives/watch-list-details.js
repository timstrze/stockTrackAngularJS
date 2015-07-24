'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:watch-list-details
 * @description
 * # watchListDetails
 */
angular.module('stockTrackAngularJsApp')
  .directive('watchListDetails', function (Constants, localStorageService) {
    return {
      restrict: 'E',
      scope: {
        symbol: '=',
        preferences: '='
      },
      templateUrl: 'views/directives/watch-list-details.html',
      controller: function ($scope) {
        $scope.Constants = Constants;

        $scope.getHistoricalData = function(startDate, endDate) {
          if($scope.symbol) {
            $scope.symbol.getHistoricalData(startDate, endDate);
            localStorageService.set('preferences', $scope.preferences);
          }
        };
      }
    };
  });
