'use strict';

/**
 * @ngdoc component
 * @name stockTrackAngularJsApp.component:watch-list
 * @element watch-list
 * @restrict E
 *
 * @description
 * # watchList
 * component for displaying the User WatchList
 *
 * @param {Object} user User Object
 */
angular.module('stockTrackAngularJsApp')
  .component('watchList', {
      templateUrl: 'views/components/watch-list.html',
      restrict: 'E',
      bindings: {
        user: '<'
      },
      controller: ['$filter', '$mdDialog', 'Symbol', 'Constants', 'SymbolList', function ($filter, $mdDialog, Symbol, Constants, SymbolList) {

        /**
         * @ngdoc function
         * @name search
         * @methodOf stockTrackAngularJsApp.component:watch-list
         *
         * @description
         * Performs the search for the Symbol Type-Ahead.
         *
         * @param {String} searchVal Search string
         *
         */
        this.search = function (searchVal) {
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
         * @name sortWatchList
         * @methodOf stockTrackAngularJsApp.component:watch-list
         *
         * @description
         * Pass through to the SymbolList.refreshSymbols method.
         *
         */
        this.sortWatchList = function(type) {
          $filter('sortSymbols')(this.user.WatchList, type);
        };



        /**
         * @ngdoc function
         * @name chooseSymbol
         * @methodOf stockTrackAngularJsApp.component:watch-list
         *
         * @description
         * Called once a User searches for a Symbol and chooses it in the type-ahead. Resets the type-ahead text box.
         * Adds new symbol to the symbol list. Sets the selected Symbol.
         *
         * @param {Object} newSymbol Symbol Object
         *
         */
        this.chooseSymbol = function (newSymbol) {
          // Make sure a Symbol was selected in the type-ahead
          if (newSymbol) {
            // Reset the type-ahead text box
            this.searchText = '';
            // Check to see if the type-ahead Symbol is in the User WatchList
            if(this.user.WatchList.some(function(wlSymbol) {return wlSymbol.symbol.toLowerCase() === newSymbol.symbol.toLowerCase();})) {
              return false;
            }
            // Add new symbol to the symbol list
            this.user.WatchList.unshift({
              symbol: newSymbol.symbol,
              Symbol: SymbolList.addSymbol(newSymbol)
            });
            // Set the selected Symbol
            this.user.selectSymbol(this.user.WatchList[0].Symbol);
          }
        };




        /**
         * @ngdoc function
         * @name removeFromWatchlist
         * @methodOf stockTrackAngularJsApp.component:watch-list
         *
         * @description
         * Confirms if the user wants to remove a Symbol from the watchlist.
         *
         * @param {Object} symbol Symbol Object
         * @param {Event} event Button click event
         *
         */
        this.removeFromWatchlist = function (symbol, event) {
          var _this = this;
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
            var index = _this.user.WatchList.map(function (wlSymbol) {
              return wlSymbol.Symbol;
            }).indexOf(symbol);
            // Remove the Symbol from the watch list
            _this.user.WatchList.splice(index, 1);
            // Set the selected symbol from the first watch list item
            _this.user.selectedSymbol = _this.user.WatchList[0].Symbol;
            // Set the selected tab from the User Preferences
            _this.selectedTab = Constants.historicalDateRange()[_this.user.Preferences.selectedHistoricalIndex];
            // Clear thehistoricalData so the animation doesn't skip
            _this.user.selectedSymbol.historicalData = [];
            // Get the historical graph data for the selected Symbol
            _this.user.selectedSymbol.getHistoricalData(_this.selectedTab.startDate, _this.selectedTab.endDate);
            _this.user.selectedSymbol.getSymbolNews();
          });
        };

      }]
  });
