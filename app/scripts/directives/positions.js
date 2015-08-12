'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:positions
 * @description
 * # positions
 */
angular.module('stockTrackAngularJsApp')
  .directive('positions', function (SymbolList) {
    return {
      scope: {
        positions: "="
      },
      templateUrl: 'views/directives/positions.html',
      restrict: 'E',
      controller: function ($scope) {

        var totalPositions = function() {
          angular.forEach($scope.positions, function(position) {

            var totalQuantity = 0;
            var totalPNL = 0;
            var dailyPNL = 0;

            angular.forEach(position.buys, function (buy) {
              totalQuantity = totalQuantity + buy.quantity;
              if(position.Symbol) {
                totalPNL = totalPNL + (position.Symbol.Ask * buy.quantity) - (buy.ask * buy.quantity);

                //Get today's date
                var todaysDate = new Date();

                //call setHours to take the time out of the comparison
                if(new Date(buy.created).setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
                  //Date equals today's date
                  dailyPNL = (position.Symbol.Ask * totalQuantity) - (buy.ask * totalQuantity)
                }else {
                  dailyPNL = (position.Symbol.Ask * totalQuantity) - (position.Symbol.PreviousClose * totalQuantity)
                }
              }
            });

            position.totalQuantity = totalQuantity;
            position.totalPNL = totalPNL;
            position.dailyPNL = dailyPNL;
            position.totalValue = (position.Symbol) ? (position.Symbol.Ask * totalQuantity) : 0;

          });
        };


        $scope.refreshSymbols = function() {
          SymbolList.refreshSymbols();
        };

        $scope.$watch('positions', function() {
          if($scope.positions) {
            totalPositions();
          }
        }, true)
      }
    };
  });
