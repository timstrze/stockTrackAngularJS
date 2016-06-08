'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.service:SymbolList
 * @description
 * # SymbolList
 * Gets all Symbols from the User.WatchList and User.Positions. All Symbols should be cloned from this list.
 */

angular.module('stockTrackAngularJsApp')
  .factory('SymbolList', function (Symbol, Market, $interval, $filter, $log) {

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
       * @name SymbolList.addSymbol
       * @methodOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Adds a Symbol to the SymbolList.Symbols array if it is not already added.
       *
       * @param {Object} item Symbol to be added to the SymbolList.Symbols array
       *
       * @returns {Object} Returns the new Symbol
       */
      addSymbol: function(item) {
        // Save a reference to the Symbol
        var dupSymbol = this.Symbols.filter(function(symbol) {return symbol.Symbol.toLowerCase() === item.Symbol.toLowerCase();});
        // Make sure the symbol isn't already in the list
        if(dupSymbol.length > 0) {
          // Return the Symbol
          return dupSymbol[0];
        }else{
          // https://jslinterrors.com/do-not-use-a-as-a-constructor
          var SSymbol = Symbol;
          // Create a new Symbol and save a reference to return
          var newSymbol = new SSymbol(item);
          // Add the new symbol to the SymbolList.Symbols array
          this.Symbols.push(newSymbol);
          // Return the new Symbol
          return newSymbol;
        }
      },



      /**
       * @ngdoc function
       * @name SymbolList.createUniqueSymbolList
       * @methodOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Adds a Symbol to the SymbolList.Symbols array if it is not already added.
       *
       * @param {Object} item Symbol to be added to the SymbolList.Symbols array
       *
       * @returns {Object} Returns the new Symbol
       */
      createUniqueSymbolList: function() {
        // Create an array of only the Symbol symbols ['wfm', 'aapl', 'dis']
        var wl = this.WatchList.Symbols.map(function(item) {return item.symbol.toLowerCase();});
        // Create an array of only the Symbol symbols ['wfm', 'aapl', 'dis']
        var ps = this.Positions.map(function(item) {return item.symbol.toLowerCase();});
        // Concat the two lists together
        var sList = wl.concat(ps.filter(function (item) {
          // Remove any duplicates
          return wl.indexOf(item) < 0;
        }));
        // Return a list of Symbols
        return sList;
      },




      /**
       * @ngdoc function
       * @name SymbolList.init
       * @methodOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Creates the SymbolList from the watchlist and positions passed in from a User.
       *
       * @param {Array} watchList WatchList from the User
       * @param {Array} positions Positions from the User
       * @param {Object} preferences Preferences from the User
       *
       */
      init: function(watchList, positions, preferences) {
        // Store a reference to this
        var _this = this;
        // Remove the window.setInterval stored on the SymbolList
        $interval.cancel(this.interval);
        // Add a reference to User.WatchList
        this.WatchList = watchList;
        // Add a reference to User.Positions
        this.Positions = positions;
        // Add a reference to User.Preferences
        this.Preferences = preferences;
        // Get the Symbol details
        return Symbol.http.all({list: this.createUniqueSymbolList()}).$promise.then(function (data) {
          return _this.setInitialSymbols(data);
        });
      },



      /**
       * @ngdoc function
       * @name SymbolList.refreshSymbols
       * @methodOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Refreshes the SymbolList properties so the angular bindings update.
       *
       */
      refreshSymbols: function() {
        // Store a reference to this
        var _this = this;
        if(Market.isOpen) {
          // Get all the Symbols by name ['wfm', 'aapl', 'dis']
          Symbol.http.all({
            list: this.Symbols.map(function (item) {
              return item.symbol.toLowerCase();
            })
          }).$promise.then(function (data) {
            // Check to see results came back
            if (data.query.results) {
              // Loop over the results
              angular.forEach(data.query.results.quote, function (quote, index) {
                // Only save the last fifty asks
                if (_this.Symbols[index].askHistory.length > 1440) {
                  // Remove the first item in the array
                  _this.Symbols[index].askHistory.shift();
                }
                // Check to make sure the Ask value is not null
                if (quote.Ask) {
                  // Add the ask to the ask history array
                  _this.Symbols[index].askHistory.push(quote.Ask);
                }
                // Loop over the properties of the Symbol
                Object.keys(quote).forEach(function (property) {
                  // Overwrite Symbol properties with the new values
                  _this.Symbols[index][property] = quote[property];
                });
              });
            }
          });
          // Log Refresh Status
          $log.debug('Refreshing Symbols: ' + $filter('date')(new Date(), 'medium'));
        }
      },




      /**
       * @ngdoc function
       * @name SymbolList.removeSymbol
       * @methodOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Removes the Symbol from the SymbolList.Symbols array if it is not also in User.Positions
       *
       * @param {Object} item Symbol to be removed from the SymbolList.Symbols array
       *
       * @returns {Array} Returns the SymbolList.Symbols
       */
      removeSymbol: function(item) {
        // Check to see if the Symbol is in User.Positions.
        var isInPositions = this.Positions.some(function(position) {
          // Check to see if the symbols match
          return item.symbol.toLowerCase() === position.symbol.toLowerCase();
        });
        // Keep the Symbol if it is in User.Positions
        if(!isInPositions) {
          // Remove the Symbol from the list
          this.Symbols.splice(this.Symbols.indexOf(item), 1);
        }
        // Return the SymbolList.Symbols
        return this.Symbols;
      },




      /**
       * @ngdoc function
       * @name SymbolList.setInitialSymbols
       * @methodOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Creates the SymbolList from the watchlist and positions passed in from a User.
       *
       * @param {Object} data Results from the call to get Symbol Data
       *
       * @returns {Array} Returns SymbolList.Symbols fully fleshed out
       *
       */
      setInitialSymbols: function(data) {
        // Create a reference to this
        var _this = this;
        // Create a temp array
        var tmpSymbolList = [];
        // Make sure there are results
        if(data && data.query && data.query.results) {
          // Loop over the results
          angular.forEach(data.query.results.quote, function (quote) {
            // https://jslinterrors.com/do-not-use-a-as-a-constructor
            var SSymbol = Symbol;
            // Create a new Symbol
            var symbol = new SSymbol(quote);
            // Add the Ask to the Ask History array
            symbol.askHistory.push(quote.Ask);
            // Add the Symbol to the temp array
            tmpSymbolList.push(symbol);
          });
          // Check if the User wants to auto-refresh Symbols
          if(this.Preferences.refreshState) {
            // Start refreshing the SymbolList and store the reference
            this.interval = $interval(function(){ _this.refreshSymbols(); }, this.Preferences.refreshRate);
          }
        }
        // Set the SymbolList.Symbols from the temp array
        this.Symbols = tmpSymbolList;
        // Return the SymbolList.Symbols
        return this.Symbols;
      }
    };
  });
