'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.service:Symbol
 * @description
 * # Symbol
 * Factory Object for Symbols containing properties and methods.
 */
angular.module('stockTrackAngularJsApp')
  .factory('Symbol', function ($resource) {

    var Symbol = function (properties) {
      // Create a reference to this
      var _this = this;
      // Loop over the keys of the object passed in
      Object.keys(properties).forEach(function (property) {
        // Set the properties of this Symbol
        _this[property] = properties[property];
      });
      // Create an empty array to hold the ask history
      this.askHistory = [];
    };




    /**
     * @ngdoc function
     * @name Symbol.getHistoricalData
     * @methodOf stockTrackAngularJsApp.service:Symbol
     *
     * @description
     * Gets the historical data that the graphs need.
     *
     * @param {String} startDate A starting date formatted "2015-08-31"
     * @param {String} endDate A starting date formatted "2015-08-31"
     *
     */
    Symbol.prototype.getHistoricalData = function (startDate, endDate) {
      // Store a reference to this
      var _this = this;
      // Get the historical data by symbol, start date, and end date
      this.http.details({
        // Example: aapl
        symbol: this.Symbol,
        // Example: "2015-05-31"
        startDate: startDate,
        // Example: "2015-08-31"
        endDate: endDate
      }).$promise.then(function (results) {
        // Set the historical data on the Symbol
        _this.historicalData = results.query.results.quote;
      });
    };





    /**
     * @ngdoc function
     * @name Symbol.http
     * @methodOf stockTrackAngularJsApp.service:Symbol
     *
     *
     * @description
     * Public access to the GET, PUT, and POST methods
     *
     * @param {String} ID of program version
     *
     */
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






    /**
     * @ngdoc function
     * @name Symbol.prototype.http
     * @methodOf stockTrackAngularJsApp.service:Symbol
     *
     *
     * @description
     * Private access to the GET, PUT, and POST methods
     *
     * @param {String} ID of program version
     *
     */
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
