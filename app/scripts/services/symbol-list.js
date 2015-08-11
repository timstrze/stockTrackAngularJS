'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.SymbolList
 * @description
 * # SymbolList
 * Gets all Symbols from the watch list and position list. All Symbols should be cloned from this list.
 */
angular.module('stockTrackAngularJsApp')
  .factory('SymbolList', function (Symbol) {

    return {
      Symbols: [],
      init: function(watchList, positions) {
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
              var symbol = new Symbol(quote);
              tmpSymbolList.push(symbol);
            });

            _this.Symbols = tmpSymbolList;
          }

          return _this.Symbols;

        });
      }
    };
  });
