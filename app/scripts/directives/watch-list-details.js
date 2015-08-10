'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:watch-list-details
 * @description
 * # watchListDetails
 */
angular.module('stockTrackAngularJsApp')
  .directive('watchListDetails', function (Constants, localStorageService, $mdSidenav, $mdDialog, $window, $filter) {
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
            var index = $scope.user.WatchList.indexOf(item);
            $scope.user.WatchList.splice(index, 1);
            $scope.user.selectedSymbol = $scope.user.WatchList[0];
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
                  $window.alert('not enough cash');
                  return false;
                }

                $scope.user.Positions.unshift({
                  name: $scope.symbol.Name,
                  Symbol: $scope.symbol,
                  symbol: $scope.symbol.Symbol,
                  ask: $scope.symbol.Ask,
                  quantity: $scope.quantity,
                  created: $filter('date')(new Date(), 'yyyy-MM-dd')
                });

                $scope.user.availableCash = $scope.user.availableCash - ($scope.quantity * $scope.symbol.Ask);

                localStorageService.set('Positions', $scope.user.Positions);

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
