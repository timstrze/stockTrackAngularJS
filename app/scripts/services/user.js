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
  .factory('User', function ($resource, Constants, Symbol, SymbolList) {


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
