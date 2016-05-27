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
         * @name openCreateWatchlistModal
         * @methodOf stockTrackAngularJsApp.component:watch-list
         *
         * @description
         * Opens the sell modal. Sets the default quantity to 1.
         *
         */
        this.openCreateWatchlistModal = function (event) {
          // Create a reference to this
          var _this = this;
          // Open sell modal
          $mdDialog.show({
            controller: function () {
              // Set the User
              this.user = _this.user;
              this.search = _this.search;

              this.symbolSuggestions = SymbolList.createUniqueSymbolList();

              this.symbolSuggestions = $filter('limitTo')(this.symbolSuggestions, 10);

              this.symbolList = [];

              this.chooseSymbol = function(item) {
                if(item) {
                  this.symbolList.push(item.Symbol);
                  var symbolPlacement = this.symbolSuggestions.findIndex(function(symbol){ return symbol.toLowerCase() === item.Symbol.toLowerCase();});

                  if(symbolPlacement > -1) {
                    this.symbolSuggestions.splice(symbolPlacement, 1);
                  }
                  this.searchText = '';
                }
              };
              // Closes the modal
              this.cancel = function () {
                $mdDialog.cancel();
              };
              // Closes the modal
              this.addSymbolToWatchlist = function (chip) {
                this.symbolList.push(chip);

                var symbolPlacement = this.symbolSuggestions.indexOf(chip);

                if(symbolPlacement > -1) {
                  this.symbolSuggestions.splice(symbolPlacement, 1);
                }
              };
              // Closes the modal
              this.create = function () {
                if(this.newWatchlistTitle) {

                  var newList = {
                    title: this.newWatchlistTitle,
                    Symbols: this.symbolList.map(function (sl) {
                      return {
                        symbol: sl
                      };
                    })
                  };

                  this.user.selectedAccount.WatchLists.unshift(newList);
                  this.user.selectedAccount.selectedWatchList = this.user.selectedAccount.WatchLists[0];
                  this.user.changeWatchList();

                  $mdDialog.cancel();
                }
              };
            },
            bindToController: true,
            controllerAs: '$ctrl',
            templateUrl: 'views/modals/watchlist-create.html',
            targetEvent: event
          });
        };



        /**
         * @ngdoc function
         * @name minimizeWatchList
         * @methodOf stockTrackAngularJsApp.component:watch-list
         *
         * @description
         * Pass through to the SymbolList.refreshSymbols method.
         *
         */
        this.minimizeWatchList = function() {
          this.user.Preferences.minimizeWatchListView = !this.user.Preferences.minimizeWatchListView;
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
          $filter('sortSymbols')(this.user.selectedAccount.selectedWatchList.Symbols, type);
        };



        /**
         * @ngdoc function
         * @name createWatchlist
         * @methodOf stockTrackAngularJsApp.component:watch-list
         *
         * @description
         * Pass through to the SymbolList.refreshSymbols method.
         *
         */
        this.deleteWatchlist = function (event) {
          var _this = this;
          // Build confirm object
          var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('Remove the watch list')
            .content('Would you like to remove the watch list titled "' + _this.user.selectedAccount.selectedWatchList.title + '"?')
            .ariaLabel('Remove watch list?')
            .ok('Remove')
            .cancel('Keep')
            .targetEvent(event);
          // Display the confirm window
          $mdDialog.show(confirm).then(function () {
            _this.user.selectedAccount.WatchLists.splice(_this.user.selectedAccount.WatchLists.indexOf(_this.user.selectedAccount.selectedWatchList), 1);
            _this.user.selectedAccount.selectedWatchList = _this.user.selectedAccount.WatchLists[0];
            _this.user.changeWatchList();
          });
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
            if(this.user.selectedAccount.selectedWatchList.Symbols.some(function(wlSymbol) {return wlSymbol.symbol.toLowerCase() === newSymbol.symbol.toLowerCase();})) {
              return false;
            }
            // Add new symbol to the symbol list
            this.user.selectedAccount.selectedWatchList.Symbols.unshift({
              symbol: newSymbol.symbol,
              Symbol: SymbolList.addSymbol(newSymbol)
            });
            // Set the selected Symbol
            this.user.selectSymbol(this.user.selectedAccount.selectedWatchList.Symbols[0]);
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
            var index = _this.user.selectedAccount.selectedWatchList.Symbols.map(function (wlSymbol) {
              return wlSymbol.Symbol;
            }).indexOf(symbol);
            // Remove the Symbol from the watch list
            _this.user.selectedAccount.selectedWatchList.Symbols.splice(index, 1);
            // Set the selected Symbol
            _this.user.selectSymbol(_this.user.selectedAccount.selectedWatchList.Symbols[0]);
          });
        };

      }]
  });
