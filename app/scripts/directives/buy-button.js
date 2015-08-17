'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:buy-button
 * @description
 * # buyButton
 */
angular.module('stockTrackAngularJsApp')
  .directive('buyButton', function ($window, $filter, $mdDialog) {
    return {
      scope: {
        symbol: '=',
        user: '='
      },
      templateUrl: 'views/directives/buy-button.html',
      restrict: 'E',
      controller: function($scope) {
        //
        var _scope = $scope;

        /**
         * @ngdoc function
         * @name openBuyModal
         * @methodOf stockTrackAngularJsApp.directive:buy-button
         *
         * @description
         * Opens the buy modal
         *
         */
        $scope.openBuyModal = function (event) {
          //
          $mdDialog.show({
            controller: ['$scope', function ($scope) {
              //
              $scope.quantity = 1;
              //
              $scope.symbol = _scope.symbol;
              $scope.user = _scope.user;
              //
              $scope.cancel = function () {
                $mdDialog.cancel();
              };


              /**
               * @ngdoc function
               * @name buy
               * @methodOf stockTrackAngularJsApp.directive:buy-button
               *
               * @description
               * Buys the selected symbol and quantity
               *
               */
              $scope.buy = function () {
                //
                if (($scope.user.availableCash - ($scope.quantity * $scope.symbol.Ask) < 0)) {
                  //
                  $window.alert('Sorry, not enough available cash for this transaction.');
                  return false;
                }
                //
                var isInPositions = $scope.user.Positions.some(function (position) {
                  return position.Symbol.Symbol.toLowerCase() === $scope.symbol.Symbol.toLowerCase();
                });
                //
                if (isInPositions) {
                  //
                  angular.forEach($scope.user.Positions, function (position) {
                    //
                    if (position.Symbol.Symbol.toLowerCase() === $scope.symbol.Symbol.toLowerCase()) {
                      //
                      position.buys.push({
                        ask: $scope.symbol.Ask,
                        quantity: $scope.quantity,
                        created: $filter('date')(new Date(), 'medium')
                      });
                    }
                  });
                } else {
                  //
                  $scope.user.Positions.unshift({
                    Symbol: $scope.symbol,
                    symbol: $scope.symbol.Symbol,
                    buys: [{
                      ask: $scope.symbol.Ask,
                      quantity: $scope.quantity,
                      created: $filter('date')(new Date(), 'medium')
                    }]
                  });
                }
                //
                $scope.user.availableCash = $scope.user.availableCash - ($scope.quantity * $scope.symbol.Ask);
                //
                //localStorageService.set('Positions', $scope.user.Positions);
                //
                $mdDialog.cancel();
              };
            }],
            templateUrl: 'views/directives/modals/buy.html',
            targetEvent: event
          });
        };
      }
    };
  });
