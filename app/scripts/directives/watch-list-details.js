'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:watch-list-details
 * @description
 * # watchListDetails
 */
angular.module('stockTrackAngularJsApp')
  .directive('watchListDetails', function (Constants, localStorageService, $mdSidenav, $mdDialog, $window, $filter, SymbolList) {
    return {
      restrict: 'E',
      scope: {
        symbol: '=',
        user: '='
      },
      templateUrl: 'views/directives/watch-list-details.html',
      controller: function ($scope) {
        var _scope = $scope;

        $scope.Constants = Constants;

        $scope.toggleWatchlist = function () {
          $mdSidenav('watch-list').toggle();
        };

        $scope.removeFromWatchlist = function (item, event) {
          var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('Remove from watch list')
            .content('Would you like to remove '+ item.Symbol +' from your watch list?')
            .ariaLabel('Remove from watchlist?')
            .ok('Remove')
            .cancel('Keep')
            .targetEvent(event);
          $mdDialog.show(confirm).then(function() {

            SymbolList.removeSymbol(item);

            var index = $scope.user.WatchList.map(function(wlSymbol) {
              return wlSymbol.Symbol;
            }).indexOf(item);

            $scope.user.WatchList.splice(index, 1);
            $scope.user.selectedSymbol = $scope.user.WatchList[0].Symbol;

          });

        };

        $scope.openSellModal = function (event) {
          console.log('sell');
        };

        $scope.openBuyModal = function (event) {

          $mdDialog.show({
            controller: ['$scope', function ($scope) {
              $scope.quantity = 1;

              $scope.symbol = _scope.symbol;
              $scope.user = _scope.user;

              $scope.cancel = function () {
                $mdDialog.cancel();
              };

              $scope.buy = function () {

                if(($scope.user.availableCash - ($scope.quantity * $scope.symbol.Ask) < 0)) {
                  $window.alert('Sorry, not enough available cash for this transaction.');
                  return false;
                }

                var isInPositions = $scope.user.Positions.some(function(position) {
                  return position.Symbol.Symbol.toLowerCase() === $scope.symbol.Symbol.toLowerCase()
                });

                if(isInPositions) {
                  angular.forEach($scope.user.Positions, function(position) {
                    if(position.Symbol.Symbol.toLowerCase() === $scope.symbol.Symbol.toLowerCase()) {
                      position.buys.push({
                        ask: $scope.symbol.Ask,
                        quantity: $scope.quantity,
                        created: $filter('date')(new Date(), 'medium')
                      });
                    }
                  });
                } else {
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

                $scope.user.availableCash = $scope.user.availableCash - ($scope.quantity * $scope.symbol.Ask);

//                localStorageService.set('Positions', $scope.user.Positions);

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
