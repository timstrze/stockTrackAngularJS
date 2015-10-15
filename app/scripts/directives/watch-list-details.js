'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:watch-list-details
 * @element watch-list-details
 * @restrict E
x *
 * @description
 * Display the selected Symbol's details and graphs.
 *
 * @param {Object} symbol Symbol Object
 * @param {Object} user User Object
 *
 */
angular.module('stockTrackAngularJsApp')
  .directive('watchListDetails', function ($mdDialog, $window, SymbolList, Constants) {
    return {
      restrict: 'E',
      scope: {
        symbol: '=',
        user: '='
      },
      templateUrl: 'views/directives/watch-list-details.html',
      controller: function ($scope) {

        /**
         * @ngdoc property
         * @name historicalTabs
         * @propertyOf stockTrackAngularJsApp.directive:watch-list-details
         *
         * @description
         * Make service method available to the ng-repeat.
         */
        $scope.historicalTabs = Constants.historicalTabs();



        /**
         * @ngdoc property
         * @name historicalTabs
         * @propertyOf stockTrackAngularJsApp.directive:watch-list-details
         *
         * @description
         * Make service method available to the ng-repeat.
         */
        $scope.openNewsWindow = function(url) {
          $window.open(url, '_blank')
        };




        /**
         * @ngdoc property
         * @name selectChartType
         * @propertyOf stockTrackAngularJsApp.directive:watch-list-details
         *
         * @description
         * Make service method available to the ng-repeat.
         */
        $scope.selectChartType = function(type) {
          $scope.selectedChart = type;
        };



        /**
         * @ngdoc function
         * @name $watch
         * @eventyOf stockTrackAngularJsApp.directive:watch-list-details
         *
         * @description
         * Watches the Symbol historicalData Array and calls the render Function.
         *
         */
        $scope.$watch('symbol', function () {
          // Make sure there is historical data
          if ($scope.symbol && $scope.user && $scope.user.Positions && $scope.user.Positions.length) {
            $scope.positions = {};

            // Loop over the Positions
            angular.forEach($scope.user.Positions, function (position) {
              // Check to see if Symbols match
              if (position.Symbol.Symbol.toLowerCase() === $scope.symbol.Symbol.toLowerCase()) {
                $scope.positions = position;
              }
            });

          }
        }, true);

      }
    };
  });
