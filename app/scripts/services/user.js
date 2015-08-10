'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.User
 * @description
 * User service that contains all the properties and methods for a user
 */
angular.module('stockTrackAngularJsApp')
  .factory('User', function (Symbol, Constants, localStorageService, $resource) {

    var symbolsInStore = localStorageService.get('Symbols');
    var preferencesInStore = localStorageService.get('Preferences');


    var User = function (properties) {
      var _this = this;
      Object.keys(properties).forEach(function (property) {
        _this[property] = properties[property];
      });
    };


    User.http = $resource('json/user.json/:id', {
      id: '@id'
    }, {
      get: {
        method: 'GET'
      }
    });

    User.prototype.getWatchListData = function () {
      var _this = this;

      Symbol.http.all({list: this.WatchList.map(function(item) {return item.Symbol})},
        function (data) {
          var tmpWatchList = [];

          if(data.query.results) {

            angular.forEach(data.query.results.quote, function (quote) {
              var symbol = new Symbol(quote);
              tmpWatchList.push(symbol);
            });

            _this.WatchList = tmpWatchList;

            localStorageService.set('WatchList', _this.WatchList);

            _this.selectedSymbol = _this.WatchList[0];


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
          }
        }
      );
    };

    return User;

  });
