'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.SymbolList
 * @description
 * # SymbolList
 * Gets all Symbols from the watch list and position list. All Symbols should be cloned from this list.
 */
angular.module('stockTrackAngularJsApp')
  .factory('SymbolList', function (Symbol, $interval, $filter) {

    return {
      Symbols: [],
      WatchList: [],
      Positions: [],
      Preferences: {},

      removeSymbol: function(item) {
        // You want to keep the Symbol if it is in the positions.
        var isInPositions = this.Positions.filter(function(position) {
          return item.symbol.toLowerCase() === position.symbol.toLowerCase();
        });

        if(isInPositions.length === 0) {
          var index = this.Symbols.indexOf(item);
          this.Symbols.splice(index, 1)
        }

        return this.Symbols;
      },

      addSymbol: function(item) {
        // Make sure the symbol isn't already in the list
        var index = this.Symbols.indexOf(item);
        if(index > -1) {
          return this.Symbols[index];
        }else{
          var newSymbol = new Symbol(item);
          this.Symbols.push(newSymbol);
          return newSymbol;
        }
      },

      refreshSymbols: function() {
        var _this = this;

        Symbol.http.all({list: this.Symbols.map(function(item) {return item.symbol})}, function (data) {

          if(data.query.results) {

            angular.forEach(data.query.results.quote, function (quote, index) {

              if(_this.Symbols[index].askHistory.length > 50) {
                _this.Symbols[index].askHistory.shift();
              }

              _this.Symbols[index].askHistory.push(quote.Ask);

              Object.keys(quote).forEach(function (property) {
                _this.Symbols[index][property] = quote[property];
              });
            });

          }

        });

        console.log("Refreshing Symbols: " + $filter('date')(new Date(), 'medium'));
      },

      init: function(watchList, positions, preferences) {
        var _this = this;
        var wl = watchList.map(function(item) {return item.symbol});
        var ps = positions.map(function(item) {return item.symbol});

        var sList = wl.concat(ps.filter(function (item) {
          return wl.indexOf(item) < 0;
        }));

        return Symbol.http.all({list: sList}, function (data) {

          var tmpSymbolList = [];

          if(data.query.results) {

            angular.forEach(data.query.results.quote, function (quote) {
              //
              var symbol = new Symbol(quote);
              //
              symbol.askHistory.push(quote.Ask);
              //
              tmpSymbolList.push(symbol);
            });

            _this.Symbols = tmpSymbolList;

            _this.WatchList = watchList;
            _this.Positions = positions;
            _this.Preferences = preferences;

            if(preferences.refreshState) {
              _this.interval = $interval( function(){ _this.refreshSymbols(); }, preferences.refreshRate);
            }
          }
          return _this.Symbols;

        });
      }
    };
  });
