'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:watch-list
 * @description
 * # watchList
 */
angular.module('stockTrackAngularJsApp')
  .directive('watchList', function (Symbol, Constants, localStorageService, $mdSidenav, SymbolList) {
    return {
      scope: {
//        savedSymbols: '=',
        watchList: '=',
        preferences: '=',
        selectedSymbol: '='
      },
      templateUrl: 'views/directives/watch-list.html',
      restrict: 'E',
      controller: function ($scope) {

        $scope.closeWatchlist = function () {
          $mdSidenav('watch-list').close();
        };

        $scope.search = function (searchVal) {
          if (searchVal && searchVal.length > 0) {
            return Symbol.http.search({searchVal: searchVal}).$promise.then(function (data) {
              var quote = data.query.results.quote;
              quote.value = quote.Name;
              quote.display = quote.Name;

              return (data.query.results.quote.Ask) ? [quote] : [];
            });
          } else {
            return [];
          }
        };

        $scope.refreshSymbols = function() {
          SymbolList.refreshSymbols();
        };

        $scope.chooseSymbol = function (item) {
          if (item) {
            $scope.searchText = '';

            // Check for duplicate entries
            if($scope.watchList.some(function(wlItem) {return wlItem.symbol.toLowerCase() === item.symbol.toLowerCase()})) {
              return false;
            }

            // Add new symbol to the symbol list
            $scope.watchList.unshift({
              symbol: item.symbol,
              Symbol: SymbolList.addSymbol(item)
            });

//            localStorageService.set('WatchList', $scope.watchList);

            $scope.selectSymbol($scope.watchList[0].Symbol);
          }
        };

        $scope.selectSymbol = function (symbol) {

          $scope.selectedSymbol = symbol;

//          $scope.preferences.lastSelectedSymbol = $scope.selectedSymbol;

//          var selectedTab = Constants.historicalTabs[$scope.preferences.selectedHistoricalIndex];
//
//          symbol.getHistoricalData(selectedTab.startDate, selectedTab.endDate);

//          localStorageService.set('preferences', $scope.preferences);
        };

      }
    };
  });
