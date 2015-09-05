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
 * @param {Object} watchList User WatchList
 * @param {Object} preferences User Preferences
 * @param {Object} selectedSymbol User selected Symbol
 */
angular.module('stockTrackAngularJsApp')
  .directive('watchList', function (Symbol, Constants, localStorageService, $mdSidenav, SymbolList) {
    return {
      scope: {
        watchList: '=',
        preferences: '=',
        selectedSymbol: '='
      },
      templateUrl: 'views/directives/watch-list.html',
      restrict: 'E',
      controller: function ($scope) {



        /**
         * @ngdoc function
         * @name closeWatchlist
         * @methodOf stockTrackAngularJsApp.directive:watch-list
         *
         * @description
         * Confirms if the user wants to remove a Symbol from the watchlist.
         *
         */
        $scope.closeWatchlist = function () {
          $mdSidenav('watch-list').close();
        };



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
            if($scope.watchList.some(function(wlSymbol) {return wlSymbol.symbol.toLowerCase() === newSymbol.symbol.toLowerCase();})) {
              return false;
            }
            // Add new symbol to the symbol list
            $scope.watchList.unshift({
              symbol: newSymbol.symbol,
              Symbol: SymbolList.addSymbol(newSymbol)
            });
            // Set the selected Symbol
            $scope.selectSymbol($scope.watchList[0].Symbol);
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
          $scope.selectedSymbol = symbol;
          // Set the selected tab from the User Preferences
          $scope.selectedTab = Constants.historicalTabs()[$scope.preferences.selectedHistoricalIndex];
          // Get the historical graph data for the selected Symbol
          symbol.getHistoricalData($scope.selectedTab.startDate, $scope.selectedTab.endDate);
        };

      }
    };
  });
