'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:watch-list
 *
 * @element div
 * @function
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
         * Confirms if the user wants to remove a Symbol from the watchlist.
         *
         * @param {String} searchVal Search string
         *
         */
        $scope.search = function (searchVal) {
          //
          if (searchVal && searchVal.length > 0) {
            //
            return Symbol.http.search({searchVal: searchVal}).$promise.then(function (data) {
              //
              var quote = data.query.results.quote;
              //
              quote.value = quote.Name;
              quote.display = quote.Name;
              //
              return (data.query.results.quote.Ask) ? [quote] : [];
            });
          } else {
            //
            return [];
          }
        };



        /**
         * @ngdoc function
         * @name refreshSymbols
         * @methodOf stockTrackAngularJsApp.directive:watch-list
         *
         * @description
         * Confirms if the user wants to remove a Symbol from the watchlist.
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
         * Confirms if the user wants to remove a Symbol from the watchlist.
         *
         * @param {Object} item Symbol Object
         *
         */
        $scope.chooseSymbol = function (item) {
          //
          if (item) {
            //
            $scope.searchText = '';
            // Check for duplicate entries
            if($scope.watchList.some(function(wlItem) {return wlItem.symbol.toLowerCase() === item.symbol.toLowerCase();})) {
              return false;
            }
            // Add new symbol to the symbol list
            $scope.watchList.unshift({
              symbol: item.symbol,
              Symbol: SymbolList.addSymbol(item)
            });
            //
            $scope.selectSymbol($scope.watchList[0].Symbol);
          }
        };



        /**
         * @ngdoc function
         * @name selectSymbol
         * @methodOf stockTrackAngularJsApp.directive:watch-list
         *
         * @description
         * Confirms if the user wants to remove a Symbol from the watchlist.
         *
         * @param {Object} symbol Symbol Object
         *
         */
        $scope.selectSymbol = function (symbol) {
          //
          $scope.selectedSymbol = symbol;
          //
          var selectedTab = Constants.historicalTabs()[$scope.preferences.selectedHistoricalIndex];
          //
          symbol.getHistoricalData(selectedTab.startDate, selectedTab.endDate);
        };

      }
    };
  });
