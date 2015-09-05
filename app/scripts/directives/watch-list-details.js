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
  .directive('watchListDetails', function ($mdDialog, $mdSidenav, SymbolList, Constants) {
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
         * @ngdoc function
         * @name removeFromWatchlist
         * @methodOf stockTrackAngularJsApp.directive:watch-list-details
         *
         * @description
         * Confirms if the user wants to remove a Symbol from the watchlist.
         *
         * @param {Object} symbol Symbol Object
         * @param {Event} event Button click event
         *
         */
        $scope.removeFromWatchlist = function (symbol, event) {
          // Build confirm object
          var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('Remove from watch list')
            .content('Would you like to remove ' + symbol.Symbol + ' from your watch list?')
            .ariaLabel('Remove from watchlist?')
            .ok('Remove')
            .cancel('Keep')
            .targetEvent(event);
          // Display the confirm window
          $mdDialog.show(confirm).$promise.then(function () {
            // Remove the Symbol from SymbolList if it is not in Positions
            SymbolList.removeSymbol(symbol);
            // Find the index of the Symbol in the watch list
            var index = $scope.user.WatchList.map(function (wlSymbol) {
              return wlSymbol.Symbol;
            }).indexOf(symbol);
            // Remove the Symbol from the watch list
            $scope.user.WatchList.splice(index, 1);
            // Set the selected symbol from the first watch list item
            $scope.user.selectedSymbol = $scope.user.WatchList[0].Symbol;
          });
        };



        /**
         * @ngdoc function
         * @name toggleWatchlist
         * @methodOf stockTrackAngularJsApp.directive:watch-list-details
         *
         * @description
         * Toggles the watch list side navigation bar.
         *
         */
        $scope.toggleWatchlist = function () {
          // Toggle the watch list
          $mdSidenav('watch-list').toggle();
        };

      }
    };
  });
