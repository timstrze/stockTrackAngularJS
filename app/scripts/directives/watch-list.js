'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:watch-list
 * @description
 * # watchList
 */
angular.module('stockTrackAngularJsApp')
  .directive('watchList', function (Symbol, Constants, localStorageService, $mdSidenav, $log) {
    return {
      scope: {
        savedSymbols: '=',
        watchList: '=',
        preferences: '=',
        selectedSymbol: '='
      },
      templateUrl: 'views/directives/watch-list.html',
      restrict: 'E',
      controller: function ($scope) {

        $scope.closeWatchlist = function() {
          $mdSidenav('watch-list').close()
            .then(function(){
              $log.debug("close LEFT is done");
            });
        };

        $scope.search = function(searchVal) {
          if(searchVal && searchVal.length > 0) {
            return Symbol.http.search({searchVal: searchVal}).$promise.then(function(data) {
              var quote = data.query.results.quote;
              quote.value = quote.Name;
              quote.display = quote.Name;

              return (data.query.results.quote.Ask) ? [quote] : [];
            });
          }else{
            return [];
          }
        };

        $scope.selectedItemChange = function(item) {
          if(item) {
            $scope.searchText = '';
            $scope.watchList.unshift(new Symbol(item));

            $scope.savedSymbols.unshift(item.Symbol);
            localStorageService.set('savedSymbols', $scope.savedSymbols);

            $scope.selectSymbol($scope.watchList[0]);
          }
        };

        $scope.selectSymbol = function(symbol) {

          $scope.selectedSymbol = symbol;

          $scope.preferences.lastSelectedSymbol = $scope.selectedSymbol;

          var selectedTab = Constants.historicalTabs[$scope.preferences.selectedHistoricalIndex];

          symbol.getHistoricalData(selectedTab.startDate, selectedTab.endDate);

          localStorageService.set('preferences', $scope.preferences);
        };

      }
    };
  });
