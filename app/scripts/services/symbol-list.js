'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.service:SymbolList
 * @description
 * # SymbolList
 * Gets all Symbols from the watch list and position list. All Symbols should be cloned from this list.
 */

angular.module('stockTrackAngularJsApp')
  .factory('SymbolList', function (Symbol, $interval, $filter, $log) {

    return {


      /**
       * @ngdoc function
       * @name SymbolList.Symbols
       * @propertyOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Symbol objects that all Symbol data is referenced
       *
       * @returns {Array} Returns an array of Symbol Objects
       *
       */
      Symbols: [],


      /**
       * @ngdoc function
       * @name SymbolList.WatchList
       * @propertyOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Reference to User.WatchList
       *
       * @returns {Array} Returns a reference to User.WatchList
       *
       */
      WatchList: [],


      /**
       * @ngdoc function
       * @name SymbolList.Positions
       * @propertyOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Reference to User.Positions
       *
       * @returns {Array} Returns a reference to User.Positions
       *
       */
      Positions: [],


      /**
       * @ngdoc function
       * @name SymbolList.Preferences
       * @propertyOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Reference to User.Preferences
       *
       * @returns {Object} Returns a reference to User.Preferences
       *
       */
      Preferences: {},


      /**
       * @ngdoc function
       * @name SymbolList.removeSymbol
       * @methodOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Removes the Symbol from the SymbolList.Symbols array if it is not also in User.Positions
       *
       * @param {Object} item Position to be removed from the SymbolList.Symbols array
       *
       * @returns {Array} Returns the SymbolList.Symbols
       */
      removeSymbol: function(item) {
        // Check to see if the Symbol is in User.Positions.
        var isInPositions = this.Positions.some(function(position) {
          // Check to see if the symbols match
          return item.symbol.toLowerCase() === position.symbol.toLowerCase();
        });
        // Keep the Symbol if it is in User.Positions.
        if(!isInPositions) {
          //
          this.Symbols.splice(this.Symbols.indexOf(item), 1);
        }
        // Return the SymbolList.Symbols
        return this.Symbols;
      },

      addSymbol: function(item) {
        // Make sure the symbol isn't already in the list
        var index = this.Symbols.indexOf(item);
        if(index > -1) {
          return this.Symbols[index];
        }else{
          // https://jslinterrors.com/do-not-use-a-as-a-constructor
          var SSymbol = Symbol;
          //
          var newSymbol = new SSymbol(item);
          this.Symbols.push(newSymbol);
          return newSymbol;
        }
      },

      refreshSymbols: function() {
        var _this = this;

        Symbol.http.all({list: this.Symbols.map(function(item) {return item.symbol;})}, function (data) {

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

        $log.debug('Refreshing Symbols: ' + $filter('date')(new Date(), 'medium'));
      },

      init: function(watchList, positions, preferences) {
        var _this = this;
        var wl = watchList.map(function(item) {return item.symbol;});
        var ps = positions.map(function(item) {return item.symbol;});

        var sList = wl.concat(ps.filter(function (item) {
          return wl.indexOf(item) < 0;
        }));

        return Symbol.http.all({list: sList}, function (data) {

          var tmpSymbolList = [];

          if(data.query.results) {

            angular.forEach(data.query.results.quote, function (quote) {
              // https://jslinterrors.com/do-not-use-a-as-a-constructor
              var SSymbol = Symbol;
              //
              var symbol = new SSymbol(quote);
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
