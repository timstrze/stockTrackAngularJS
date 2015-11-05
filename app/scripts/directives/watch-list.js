'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:watch-list
 * @element watch-list
 * @restrict E
 *
 * @description
 * # watchList
 * Directive for displaying the User WatchList
 *
 * @param {Object} user User Object
 */
angular.module('stockTrackAngularJsApp')
  .directive('watchList', function ($mdDialog, Symbol, Constants, SymbolList) {
    return {
      scope: {
        user: '='
      },
      templateUrl: 'views/directives/watch-list.html',
      restrict: 'E',
      controller: function ($scope) {



        /**
         * @ngdoc function
         * @name search
         * @methodOf stockTrackAngularJsApp.directive:watch-list
         *
         * @description
         * Performs the search for the Symbol Type-Ahead.
         *
         * @param {String} searchVal Search string
         *
         */
        $scope.search = function (searchVal) {
          // Make sure the string has at least one character
          if (searchVal && searchVal.length > 0) {
            // Perform the search
            return Symbol.http.search({searchVal: searchVal}).$promise.then(function (data) {
              // Create a shorter name
              var quote = data.query.results.quote;
              // Set the value property for the type-ahead
              quote.value = quote.Name;
              // Set the display property for the type-ahead
              quote.display = quote.Name;
              // Return our search with the new type-ahead properties or an empty array
              return (data.query.results.quote.Ask) ? [quote] : [];
            });
          } else {
            // Return an empty array
            return [];
          }
        };



        /**
         * @ngdoc function
         * @name refreshSymbols
         * @methodOf stockTrackAngularJsApp.directive:watch-list
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
         * @name chooseSymbol
         * @methodOf stockTrackAngularJsApp.directive:watch-list
         *
         * @description
         * Called once a User searches for a Symbol and chooses it in the type-ahead. Resets the type-ahead text box.
         * Adds new symbol to the symbol list. Sets the selected Symbol.
         *
         * @param {Object} newSymbol Symbol Object
         *
         */
        $scope.chooseSymbol = function (newSymbol) {
          // Make sure a Symbol was selected in the type-ahead
          if (newSymbol) {
            // Reset the type-ahead text box
            $scope.searchText = '';
            // Check to see if the type-ahead Symbol is in the User WatchList
            if($scope.user.WatchList.some(function(wlSymbol) {return wlSymbol.symbol.toLowerCase() === newSymbol.symbol.toLowerCase();})) {
              return false;
            }
            // Add new symbol to the symbol list
            $scope.user.WatchList.unshift({
              symbol: newSymbol.symbol,
              Symbol: SymbolList.addSymbol(newSymbol)
            });
            // Set the selected Symbol
            $scope.selectSymbol($scope.user.WatchList[0].Symbol);
          }
        };



        /**
         * @ngdoc function
         * @name selectSymbol
         * @methodOf stockTrackAngularJsApp.directive:watch-list
         *
         * @description
         * Sets the selected Symbol and get the historical graph data for the selected Symbol.
         *
         * @param {Object} symbol Symbol Object
         *
         */
        $scope.selectSymbol = function (symbol) {
          // Set the selected Symbol
          $scope.user.selectedSymbol = symbol;
          // Set the selected tab from the User Preferences
          $scope.selectedTab = Constants.historicalDateRange()[$scope.user.Preferences.selectedHistoricalIndex];
          // Clear the historicalData so the animation doesn't skip
          $scope.user.selectedSymbol.historicalData = [];
          // Get the historical graph data for the selected Symbol
          symbol.getHistoricalData($scope.selectedTab.startDate, $scope.selectedTab.endDate);
          symbol.getSymbolNews();
        };




        /**
         * @ngdoc function
         * @name removeFromWatchlist
         * @methodOf stockTrackAngularJsApp.directive:watch-list
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
          $mdDialog.show(confirm).then(function () {
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
            // Set the selected tab from the User Preferences
            $scope.selectedTab = Constants.historicalDateRange()[$scope.user.Preferences.selectedHistoricalIndex];
            // Clear thehistoricalData so the animation doesn't skip
            $scope.user.selectedSymbol.historicalData = [];
            // Get the historical graph data for the selected Symbol
            $scope.user.selectedSymbol.getHistoricalData($scope.selectedTab.startDate, $scope.selectedTab.endDate);
            $scope.user.selectedSymbol.getSymbolNews();
          });
        };

      }
    };
  });
