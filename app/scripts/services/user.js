'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.service:User
 * @description
 * # User
 * User service that contains all the properties and methods for a user
 *
 */
angular.module('stockTrackAngularJsApp')
  .factory('User', function ($resource, $mdDialog, $filter, $window, Constants, Symbol, SymbolList, OptionChain) {


    var User = function (properties) {
      var _this = this;
      Object.keys(properties).forEach(function (property) {
        _this[property] = properties[property];
      });
    };




    /**
     * @ngdoc function
     * @name User.http
     * @methodOf stockTrackAngularJsApp.service:User
     *
     * @description
     * Public access to the GET, PUT, and POST methods
     *
     * @param {String} ID of program version
     */
    User.http = $resource('json/user.json/:id', {
      id: '@id'
    }, {
      get: {
        method: 'GET'
      }
    });





    /**
     * @ngdoc function
     * @name User.changeWatchList
     * @methodOf stockTrackAngularJsApp.services:User
     *
     * @description
     * Create the initial Symbol List from the User's watch list and position list.
     *
     * @return {Object} Returns the Promise from getting all the Symbol data
     */
    User.prototype.changeWatchList = function () {
      // Create the initial Symbol List from the User's watch list and position list
      var _this = this;
      // Initiates the Symbol list for the watchlist and positions
      this.initSymbolList().then(function () {
        //* Link the Symbols in the position list to the Symbols in the SymbolList.
        _this.linkPositionSymbols();
        // Set the Symbols in the watch list
        _this.linkWatchlistSymbols();
        // Set the selected Symbol
        _this.selectSymbol(_this.selectedAccount.selectedWatchList.Symbols[0]);
      });
    };




    /**
     * @ngdoc function
     * @name User.openSellModal
     * @methodOf stockTrackAngularJsApp.services:User
     *
     * @description
     * Opens the sell modal. Sets the default quantity to 1.
     *
     */
    User.prototype.openSellModal = function (event, symbol) {
      // Create a reference to this
      var _this = this;
      // Open sell modal
      $mdDialog.show({
        controller: function () {
          // Set a default quantity
          this.quantity = 1;
          // Set the Symbol
          this.symbol = symbol;
          // Set the User
          this.user = _this;
          // Closes the modal
          this.cancel = function () {
            $mdDialog.cancel();
          };
          // Pass through to sell function
          this.sell = _this.sell;
        },
        bindToController: true,
        controllerAs: '$ctrl',
        templateUrl: 'views/modals/sell.html',
        targetEvent: event
      });
    };




    /**
     * @ngdoc function
     * @name User.openOptionChainModal
     * @methodOf stockTrackAngularJsApp.services:User
     *
     * @description
     * Opens the sell modal. Sets the default quantity to 1.
     *
     */
    User.prototype.openOptionChainModal = function (event, symbol) {
      // Create a reference to this
      var _this = this;
      // Open sell modal
      $mdDialog.show({
        controller: function ($scope, $http) {
          // Set the Symbol
          this.symbol = symbol;
          // Set the User
          this.user = _this;

          this.OptionChain = OptionChain;

          // Closes the modal
          this.cancel = function () {
            $mdDialog.cancel();
          };

          this.selected = [];

          this.changeExpiration = function () {

            // expd:29
            // expm:7
            // expy:2016

          };



          this.query = {
            order: 'call.strike',
            limit: 5,
            page: 1
          };

          this.success = function(desserts) {
            $scope.desserts = desserts;
          };

          this.optionsPromise = OptionChain.getChain(this.symbol).$promise;

          this.getDesserts = function () {};

        },
        bindToController: true,
        controllerAs: '$ctrl',
        templateUrl: 'views/modals/option-chain.html',
        targetEvent: event
      });
    };

    /**
     * @ngdoc function
     * @name User.sell
     * @methodOf stockTrackAngularJsApp.services:User
     *
     * @description
     * Sells the selected symbol and quantity. Checks to see if the User has enough cash to make the trade.
     * Updates the User's available cash.
     *
     */
    User.prototype.sell = function () {
      // Close the modal window
      $mdDialog.cancel();
    };

    /**
     * @ngdoc function
     * @name User.openBuyModal
     * @methodOf stockTrackAngularJsApp.services:User
     *
     * @description
     * Opens the buy modal. Sets the default quantity to 1.
     *
     */
    User.prototype.openBuyModal = function (event, symbol) {
      // Create a reference to this
      var _this = this;
      // Open buy modal
      $mdDialog.show({
        controller: function () {
          // Set a default quantity
          this.limitLocked = false;
          // Set a default quantity
          this.quantity = 1;
          // Set the Constants in the html template
          this.Constants = Constants;
          // Set the Symbol
          this.symbol = symbol;
          // Set the User
          this.user = _this;
          // Closes the modal
          this.lockLimit = function () {
            this.limitLocked = true;
          };
          // Closes the modal
          this.unlockLimit = function () {
            this.limitLocked = false;
          };
          // Closes the modal
          this.cancel = function () {
            $mdDialog.cancel();
          };
          // Pass through to buy function
          this.buy = _this.buy;
        },
        bindToController: true,
        controllerAs: '$ctrl',
        templateUrl: 'views/modals/buy.html',
        targetEvent: event
      });
    };

    /**
     * @ngdoc function
     * @name User.openUserPreferenceModal
     * @methodOf stockTrackAngularJsApp.services:User
     *
     * @description
     * Opens the user preferences modal.
     *
     */
    User.prototype.openUserPreferenceModal = function (event) {
      // Create a reference to this
      var _this = this;
      // Open buy modal
      $mdDialog.show({
        controller: ['$interval', function ($interval) {
          // Set the Constants in the html template
          this.Constants = Constants;
          // Set the User
          this.user = _this;

          /**
           * @ngdoc function
           * @name symbolRefreshChange
           * @methodOf stockTrackAngularJsApp.service:User
           *
           * @description
           * Updates the User Preferences of a refresh change. Remove the window.setInterval stored on the SymbolList.
           * Sets the refresh interval for the Symbol List. Refresh rate is a {Number} in milliseconds.
           *
           */
          this.symbolRefreshChange = function() {
            // Remove the window.setInterval stored on the SymbolList
            $interval.cancel(SymbolList.interval);
            // Check to see if the refresh state is turned on
            if(this.user.Preferences.refreshState) {
              // Set the refresh interval for the Symbols
              SymbolList.interval = $interval(function(){
                  // Call the refresh method
                  SymbolList.refreshSymbols();
                },
                // Set the time of the refresh {Number} in milliseconds
                this.user.Preferences.refreshRate);
            }
          };

          // Closes the modal
          this.cancel = function () {
            $mdDialog.cancel();
          };

        }],
        bindToController: true,
        controllerAs: '$ctrl',
        templateUrl: 'views/modals/user-preferences.html',
        targetEvent: event
      });
    };

    /**
     * @ngdoc function
     * @name User.buy
     * @methodOf stockTrackAngularJsApp.service:User
     *
     * @description
     * Buys the selected symbol and quantity. Checks to see if the User has enough cash to make the trade.
     * Updates the User's available cash.
     *
     */
    User.prototype.buy = function () {
      // Create a reference to this
      var _this = this;
      // Check to see if the User has enough cash to make the trade
      if ((this.user.selectedAccount.availableCash - (this.quantity * this.symbol.Ask) < 0)) {
        // Alert the User
        $window.alert('Sorry, not enough available cash for this transaction.');
        // Return false to end the function
        return false;
      }
      // Check to see if the Symbol is already in the Positions list
      var isInPositions = this.user.selectedAccount.Positions.some(function(position) {
        // Return true if the Symbols match
        return position.Symbol.Symbol.toLowerCase() === _this.symbol.Symbol.toLowerCase();
      });
      // If the Symbol is already in the Positions list then you push to the existing Position
      if (isInPositions) {
        // Loop over the Positions
        angular.forEach(this.user.selectedAccount.Positions, function (position) {
          // Check to see if Symbols match
          if (position.Symbol.Symbol.toLowerCase() === _this.symbol.Symbol.toLowerCase()) {
            // Push the buy into the Position
            position.buys.push({
              ask: _this.symbol.Ask,
              quantity: _this.quantity,
              created: $filter('date')(new Date(), 'medium')
            });
          }
        });
        // The Symbol is not in the Positions list
      } else {
        // Add the new Position to the top of the list
        this.user.selectedAccount.Positions.unshift({
          Symbol: this.symbol,
          symbol: this.symbol.Symbol,
          buys: [{
            ask: this.symbol.Ask,
            quantity: this.quantity,
            created: $filter('date')(new Date(), 'medium')
          }]
        });
      }
      // Update the User's available cash
      this.user.selectedAccount.availableCash = this.user.selectedAccount.availableCash - (this.quantity * this.symbol.Ask);
      // Close the modal window
      $mdDialog.cancel();
    };



    /**
     * @ngdoc function
     * @name User.selectAccount
     * @methodOf stockTrackAngularJsApp.service:User
     *
     * @description
     * Create the initial Symbol List from the User's watch list and position list.
     *
     * @return {Object} Returns the Promise from getting all the Symbol data
     */
    User.prototype.selectAccount = function () {
      // Create the initial Symbol List from the User's watch list and position list
      this.selectedAccount.selectedWatchList = this.selectedAccount.WatchLists[0];
      // Changes and initiates the Symbol list for the watchlist and positions
      this.changeWatchList();
    };



    /**
     * @ngdoc function
     * @name User.initSymbolList
     * @methodOf stockTrackAngularJsApp.service:User
     *
     * @description
     * Create the initial Symbol List from the User's watch list and position list.
     *
     * @return {Object} Returns the Promise from getting all the Symbol data
     */
    User.prototype.initSymbolList = function () {
      // Create the initial Symbol List from the User's watch list and position list
      return SymbolList.init(this.selectedAccount.selectedWatchList, this.selectedAccount.Positions, this.Preferences);
    };



    /**
     * @ngdoc function
     * @name User.linkPositionSymbols
     * @methodOf stockTrackAngularJsApp.service:User
     *
     * @description
     * Link the Symbols in the User.Positions to the Symbols in the SymbolList.
     *
     */
    User.prototype.linkPositionSymbols = function () {
      // Reference the Symbols in the SymbolList
      var symbols = SymbolList.Symbols;
      // Loop through the User.Positions
      angular.forEach(this.selectedAccount.Positions, function(position) {
        // Loops through the SymbolList
        angular.forEach(symbols, function(smbl) {
          // Check if Symbols match
          if(smbl.symbol.toLowerCase() === position.symbol.toLowerCase()) {
            // Link the Symbol in the User.Position list to the SymbolList
            position.Symbol = smbl;
          }
        });
      });
    };



    /**
     * @ngdoc function
     * @name User.refreshSymbols
     * @methodOf stockTrackAngularJsApp.service:User
     *
     * @description
     * Pass through to the SymbolList.refreshSymbols method.
     *
     */
    User.prototype.refreshSymbols = function() {
      SymbolList.refreshSymbols();
    };




    /**
     * @ngdoc function
     * @name User.selectSymbol
     * @methodOf stockTrackAngularJsApp.service:User
     *
     * @description
     * Sets the selected Symbol and get the historical graph data for the selected Symbol.
     *
     * @param {Object} symbol Symbol Object
     *
     */
    User.prototype.selectSymbol = function (symbol) {
      // Create a reference to this
      var _this = this;
      // Set the selected Symbol
      this.selectedAccount.selectedSymbol = symbol;
      // Set the selected date range from the User Preferences
      this.selectedDateRange = Constants.historicalDateRange().find(function (hRange) {
        return hRange.slug === _this.Preferences.selectedHistoricalDateRange;
      });
      // Clear the historicalData so the animation doesn't skip
      this.selectedAccount.selectedSymbol.historicalData = [];
      // Get the historical graph data for the selected Symbol
      symbol.Symbol.getHistoricalData(this.selectedDateRange.slug);
      symbol.Symbol.getSymbolNews();
    };




    /**
     * @ngdoc function
     * @name User.linkWatchlistSymbols
     * @methodOf stockTrackAngularJsApp.service:User
     *
     * @description
     * Link the Symbols in the User.WatchList to the Symbols in the SymbolList.
     *
     */
    User.prototype.linkWatchlistSymbols = function () {
      // Reference the Symbols in the SymbolList
      var symbols = SymbolList.Symbols;
      // Loop through the User.WatchList
      angular.forEach(this.selectedAccount.selectedWatchList.Symbols, function(watchList) {
        // Loops through the SymbolList
        angular.forEach(symbols, function(smbl) {
          // Check if Symbols match
          if(smbl.symbol.toLowerCase() === watchList.symbol.toLowerCase()) {
            // Link the Symbol in the User.WatchList to the SymbolList
            watchList.Symbol = smbl;
          }
        });
      });
    };

    return User;

  });
