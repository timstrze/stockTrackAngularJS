'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:positions
 * @element positions
 * @restrict E
 *
 * @description
 * # positions
 * Directive to display User Positions.
 *
 * @param {Object} positions User Positions
 */
angular.module('stockTrackAngularJsApp')
  .directive('positions', function (SymbolList) {
    return {
      scope: {
        positions: '='
      },
      templateUrl: 'views/directives/positions.html',
      restrict: 'E',
      controller: function ($scope) {

        /**
         * @ngdoc function
         * @name totalPositions
         * @methodOf stockTrackAngularJsApp.directive:positions
         *
         * @description
         * Calculates the PNL for the User Positions. If the buy did happen today use the Symbols ask value then
         * use the Symbols previous close value.
         *
         */
        $scope.totalPositions = function() {
          // Loop over the User Positions
          angular.forEach($scope.positions, function(position) {
            // Set the default values
            var totalQuantity = 0;
            var totalPNL = 0;
            var dailyPNL = 0;
            // Loop over the buys Array
            angular.forEach(position.buys, function (buy) {
              // Add the quantity
              totalQuantity = totalQuantity + buy.quantity;
              // Check that the Symbol Object has been added to the Position
              if(position.Symbol) {
                // Add the total PNL
                totalPNL = totalPNL + (position.Symbol.Ask * buy.quantity) - (buy.ask * buy.quantity);
                // Get today's date
                var todaysDate = new Date();
                // Check to see if the buy happened today and use setHours to take the time out of the comparison
                if(new Date(buy.created).setHours(0,0,0,0) === todaysDate.setHours(0,0,0,0)) {
                  // If the buy did happen today use the Symbols ask value
                  dailyPNL = (position.Symbol.Ask * totalQuantity) - (buy.ask * totalQuantity);
                }else {
                  // If the buy did not happen today use the Symbols previous close value
                  dailyPNL = (position.Symbol.Ask * totalQuantity) - (position.Symbol.PreviousClose * totalQuantity);
                }
              }
            });
            // Set the scope values
            position.totalQuantity = totalQuantity;
            position.totalPNL = totalPNL;
            position.dailyPNL = dailyPNL;
            position.totalValue = (position.Symbol) ? (position.Symbol.Ask * totalQuantity) : 0;
          });
        };


        /**
         * @ngdoc function
         * @name refreshSymbols
         * @methodOf stockTrackAngularJsApp.directive:positions
         *
         * @description
         * Pass through to the SymbolList.refreshSymbols method.
         *
         */
        $scope.refreshSymbols = function() {
          SymbolList.refreshSymbols();
        };


        /**
         * @ngdoc function
         * @name $watch
         * @eventOf stockTrackAngularJsApp.directive:positions
         *
         * @description
         * Watches the User Positions and calls the totalPositions Function.
         *
         */
        $scope.$watch('positions', function() {
          if($scope.positions) {
            $scope.totalPositions();
          }
        }, true);
      }
    };
  });
