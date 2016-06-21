'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.service:OptionChain
 * @description
 * # OptionChain
 * Factory Object for OptionChains containing properties and methods.
 */
angular.module('stockTrackAngularJsApp')
  .factory('OptionChain', function ($resource, $http, Constants) {

    var OptionChain = function (properties) {
      // Create a reference to this
      var _this = this;
      // Loop over the keys of the object passed in
      Object.keys(properties).forEach(function (property) {
        // Set the properties of this OptionChain
        _this[property] = properties[property];
      });
      // Create an empty array to hold the ask history
      this.askHistory = [];
    };





    /**
     * @ngdoc function
     * @name OptionChain.prototype.http
     * @methodOf stockTrackAngularJsApp.service:OptionChain
     *
     *
     * @description
     * Private access to the GET, PUT, and POST methods
     *
     * @param {String} ID of program version
     *
     */
    OptionChain.http = $resource('https://query.yahooapis.com/v1/public/yql', {
    }, {
      get: {
        method: 'GET',
        url: 'http://www.google.com/finance/option_chain',
        // url: 'https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.options where symbol="DIS"',
        params: {
          output: 'json',
          q: 'aapl'
        }
      }
    });



    OptionChain.preprocessJSON = function(str) {
      return str.replace(/("(\\.|[^"])*"|'(\\.|[^'])*')|(\w+)\s*:/g,
        function(all, string, strDouble, strSingle, jsonLabel) {
          if (jsonLabel) {
            return '"' + jsonLabel + '": ';
          }
          return all;
        });
    };



    /**
     * @ngdoc function
     * @name OptionChain.prototype.getChain
     * @methodOf stockTrackAngularJsApp.service:OptionChain
     *
     *
     * @description
     * Public access to the GET, PUT, and POST methods
     *
     * @param {String} symbol of program version
     *
     */
    OptionChain.getChain = function (symbol) {
      return $http.get('http://www.google.com/finance/option_chain?output=json&q=' + symbol.Symbol, {
        transformResponse: function(response) {
          return JSON.parse(OptionChain.preprocessJSON(response));
        }
      })
      .success(function(data) {

        OptionChain.Chain = data;
        OptionChain.Chain.callsAndPuts = [];

        angular.forEach(data.calls, function (call, $index) {
          OptionChain.Chain.callsAndPuts.push({
            call: call,
            put: data.puts[$index]
          });
        });




        // console.log(OptionChain.Chain.puts.length, OptionChain.Chain.calls.length)
      });
    };


    return OptionChain;

  });
