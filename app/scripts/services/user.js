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
  .factory('User', function ($resource, $mdDialog, $filter, $window, Constants, Symbol, SymbolList) {


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
     * @name openSellModal
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
        controller: ['$scope', function ($scope) {
          // Set a default quantity
          $scope.quantity = 1;
          // Set the Symbol
          $scope.symbol = symbol;
          // Set the User
          $scope.user = _this;
          // Closes the modal
          $scope.cancel = function () {
            $mdDialog.cancel();
          };
          // Pass through to sell function
          $scope.sell = _this.sell;
        }],
        templateUrl: 'views/directives/modals/sell.html',
        targetEvent: event
      });
    };

    /**
     * @ngdoc function
     * @name sell
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
        controller: ['$scope', function ($scope) {
          // Set a default quantity
          $scope.limitLocked = false;
          // Set a default quantity
          $scope.quantity = 1;
          // Set the Constants in the html template
          $scope.constants = Constants;
          // Set the Symbol
          $scope.symbol = symbol;
          // Set the User
          $scope.user = _this;
          // Closes the modal
          $scope.lockLimit = function () {
            $scope.limitLocked = true;
          };
          // Closes the modal
          $scope.unlockLimit = function () {
            $scope.limitLocked = false;
          };
          // Closes the modal
          $scope.cancel = function () {
            $mdDialog.cancel();
          };
          // Pass through to buy function
          $scope.buy = _this.buy;
        }],
        templateUrl: 'views/directives/modals/buy.html',
        targetEvent: event
      });
    };

    /**
     * @ngdoc function
     * @name buy
     * @methodOf stockTrackAngularJsApp.directive:buy-button
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
      if ((this.user.availableCash - (this.quantity * this.symbol.Ask) < 0)) {
        // Alert the User
        $window.alert('Sorry, not enough available cash for this transaction.');
        // Return false to end the function
        return false;
      }
      // Check to see if the Symbol is already in the Positions list
      var isInPositions = this.user.Positions.some(function(position) {
        // Return true if the Symbols match
        return position.Symbol.Symbol.toLowerCase() === _this.symbol.Symbol.toLowerCase();
      });
      // If the Symbol is already in the Positions list then you push to the existing Position
      if (isInPositions) {
        // Loop over the Positions
        angular.forEach(this.user.Positions, function (position) {
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
        this.user.Positions.unshift({
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
      this.user.availableCash = this.user.availableCash - (this.quantity * this.symbol.Ask);
      // Close the modal window
      $mdDialog.cancel();
    };



    /**
     * @ngdoc function
     * @name User.initSymbolList
     * @methodOf stockTrackAngularJsApp.service:User
     *
     * @description
     * Create the initial Symbol List from the User's watch list and position list.
     *
     * @return {Promise} Returns the promise from getting all the Symbol data
     */
    User.prototype.initSymbolList = function () {
      // Create the initial Symbol List from the User's watch list and position list
      return SymbolList.init(this.WatchList, this.Positions, this.Preferences);
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
      angular.forEach(this.Positions, function(position) {
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
      angular.forEach(this.WatchList, function(watchList) {
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
