'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.User
 * @description
 * User service that contains all the properties and methods for a user
 */
angular.module('stockTrackAngularJsApp')
  .factory('User', function (Symbol, Constants, localStorageService, $resource, SymbolList) {

//    var symbolsInStore = localStorageService.get('Symbols');
//    var preferencesInStore = localStorageService.get('Preferences');

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
     * Toggles the User Preferences Modal.
     *
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
     * Toggles the User Preferences Modal.
     *
     */
    User.prototype.initSymbolList = function () {
      return SymbolList.init(this.WatchList, this.Positions, this.Preferences);
    };



    /**
     * @ngdoc function
     * @name User.updatePositionSymbols
     * @methodOf stockTrackAngularJsApp.service:User
     *
     * @description
     * Toggles the User Preferences Modal.
     *
     */
    User.prototype.updatePositionSymbols = function () {
      var symbols = SymbolList.Symbols;
      angular.forEach(this.Positions, function(position) {
        angular.forEach(symbols, function(smbl) {
          if(smbl.symbol.toLowerCase() === position.symbol.toLowerCase()) {
            position.Symbol = smbl;
          }
        });
      });
    };



    /**
     * @ngdoc function
     * @name User.updateWatchlistSymbols
     * @methodOf stockTrackAngularJsApp.service:User
     *
     * @description
     * Toggles the User Preferences Modal.
     *
     */
    User.prototype.updateWatchlistSymbols = function () {
      var symbols = SymbolList.Symbols;
      angular.forEach(this.WatchList, function(watchList) {
        angular.forEach(symbols, function(smbl) {
          if(smbl.symbol.toLowerCase() === watchList.symbol.toLowerCase()) {
            watchList.Symbol = smbl;
          }
        });
      });

//        localStorageService.set('WatchList', _this.WatchList);

//        _this.selectedSymbol = _this.WatchList[0];


//            if (_this.preferences.lastSelectedSymbol) {
//
//              angular.forEach(tmpWatchList, function (wlSymbol) {
//                if (wlSymbol.Symbol === _this.Preferences.lastSelectedSymbol.Symbol) {
//                  _this.selectedSymbol = wlSymbol;
//                }
//              });
//
//              if (!_this.selectedSymbol) {
//                _this.selectedSymbol = _this.watchList[0];
//              }
//
//            } else {
//              _this.selectedSymbol = _this.watchList[0];
//              _this.preferences.lastSelectedSymbol = _this.selectedSymbol;
//              localStorageService.set('preferences', _this.preferences);
//            }
//            //
//            var selectedTab = Constants.historicalTabs[_this.preferences.selectedHistoricalIndex || 2];
//            //
//            _this.selectedSymbol.getHistoricalData(selectedTab.startDate, selectedTab.endDate);


    };

    return User;

  });
