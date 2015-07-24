'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.Symbol
 * @description
 * # Symbol
 * Factory in the stockTrackAngularJsApp.
 */
angular.module('stockTrackAngularJsApp')
  .factory('Symbol', function ($resource) {

    var Symbol = function(properties) {
      var _this = this;
      Object.keys(properties).forEach(function(property) {
        _this[property] = properties[property];
      });
    };


    //Symbol.prototype.historicalData = {};


    Symbol.prototype.getHistoricalData = function(startDate, endDate) {
      var _this = this;

      this.http.details({
        symbol: this.Symbol,
        startDate: startDate,
        endDate: endDate
      }, function(results) {
        _this.historicalData = results.query.results.quote;
      });
    };


    Symbol.prototype.remove = function(container, selectedTab) {
      //container.splice(container.indexOf(this), 1);
      //container[0].selected = true;
      //container[0].getDetails(selectedTab.startDate, selectedTab.endDate);
    };


    Symbol.http = $resource('http://query.yahooapis.com/v1/public/yql', {
    }, {
      search: {
        method: 'GET',
        url: 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quotes where symbol in (":searchVal")',
        params: {
          format: 'json',
          env: 'store://datatables.org/alltableswithkeys'
        }
      },
      all: {
        method: 'GET',
        url: 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quotes where symbol in (":list")',
        params: {
          format: 'json',
          env: 'store://datatables.org/alltableswithkeys'
        }
      }
    });

    Symbol.prototype.http = $resource('http://query.yahooapis.com/v1/public/yql', {
    }, {
      details: {
        method: 'GET',
        url: 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.historicaldata where symbol = ":symbol" and startDate = ":startDate" and endDate = ":endDate"',
        params: {
          format: 'json',
          env: 'store://datatables.org/alltableswithkeys'
        }
      }
    });

    return Symbol;

  });
