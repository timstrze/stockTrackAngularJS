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
      controller: function ($scope) {

        var totalPositions = function() {
          angular.forEach($scope.positions, function(position) {

            var totalQuantity = 0;
            var totalPNL = 0;

            angular.forEach(position.buys, function (buy) {
              totalQuantity = totalQuantity + buy.quantity;
              if(position.Symbol) {
                totalPNL = totalPNL + (position.Symbol.Ask * buy.quantity) - (buy.ask * buy.quantity);
              }
            });

            position.totalQuantity = totalQuantity;
            position.dailyPNL = (position.Symbol) ? (position.Symbol.Ask * totalQuantity) - (position.Symbol.PreviousClose * totalQuantity) : 0;
            position.totalPNL = totalPNL;
            position.totalValue = (position.Symbol) ? (position.Symbol.Ask * totalQuantity) : 0;

          });
        };

        $scope.$watch('positions', function() {
          if($scope.positions) {
            totalPositions();
          }
        }, true)
      }
    };
  });
