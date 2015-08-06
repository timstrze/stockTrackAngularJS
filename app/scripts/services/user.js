'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.User
 * @description
 * User service that contains all the properties and methods for a user
 */
angular.module('stockTrackAngularJsApp')
  .factory('User', function (Symbol, Constants, localStorageService) {

    var savedSymbolsInStore = localStorageService.get('savedSymbols');
    var preferencesInStore  = localStorageService.get('preferences');

    return {
      savedSymbols: savedSymbolsInStore || [
        'AAPL',
        'AXP',
        'WFM'
      ],

      //watchList

      Positions: [{
        name: "AAPL",
        symbol: {},
        buys: [
          {
            ask: 105,
            amount: 15
          }
        ]
      }],

      preferences: preferencesInStore || {
        selectedHistoricalIndex: 2
      },

      getWatchListData: function() {
        var _this = this;

        Symbol.http.all({list: this.savedSymbols},
          function(data) {
            _this.watchList = [];

            if(data.query.results) {

              angular.forEach(data.query.results.quote, function(quote, $index) {
                var symbol = new Symbol(quote);
                _this.watchList.push(symbol);

              });

              if(_this.preferences.lastSelectedSymbol) {

                angular.forEach(_this.watchList, function(wlSymbol) {
                  if(wlSymbol.Symbol ===_this.preferences.lastSelectedSymbol.Symbol) {
                    _this.selectedSymbol = wlSymbol;
                  }
                });

                if(!_this.selectedSymbol) {
                  _this.selectedSymbol = _this.watchList[0];
                }

              }else {
                _this.selectedSymbol = _this.watchList[0];
                _this.preferences.lastSelectedSymbol = _this.selectedSymbol;
                localStorageService.set('preferences', _this.preferences);
              }
              //
              var selectedTab = Constants.historicalTabs[_this.preferences.selectedHistoricalIndex || 2];
              //
              _this.selectedSymbol.getHistoricalData(selectedTab.startDate, selectedTab.endDate);
            }
          }
        );
      }
    };
  });
