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
        url: 'https://www.google.com/finance/option_chain',
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
     * @param {Object} expiration expiration dates m, d, y
     *
     */
    OptionChain.getChain = function (symbol, expiration) {

      // expd:29
      // expm:7
      // expy:2016

      return $http.get('https://www.google.com/finance/option_chain?output=json&q=' + symbol.Symbol, {
        transformResponse: function(response) {
          return JSON.parse(OptionChain.preprocessJSON(response));
        }
      })
        .success(function(data) {

          OptionChain.Chain = data;

          OptionChain.Chain.selectedExpiration = data.expirations[0];

          OptionChain.Chain.callsAndPuts = [];

          angular.forEach(data.calls, function (call, $index) {

            // var test = {a:put.a,
            //   b:"203.35",
            //   c:"0.00",
            //   cid:"921546344579887",
            //   cp:"0.00",
            //   cs:"chb",
            //   e:"OPRA",
            //   expiry:"Jun 24, 2016",
            //   name:"",
            //   oi:"1",
            //   p:"182.00",
            //   s:"AMZN160624C00510000",
            //   strike:"510.00",
            //   vol:"-"};


            var put = data.puts[$index];

            var putObject = {
              a: put.a,
              b: put.b,
              c: put.c,
              cid: put.cid,
              cp: put.cp,
              cs: put.cs,
              e: put.e,
              expiry: put.expiry,
              name: put.name,
              oi: parseFloat(put.oi),
              p: put.p,
              s: put.s,
              strike: (put.strike * 100)/100,
              vol: (put.vol.includes('-')) ? 0: parseFloat(put.vol)
            };

            var callObject = {
              a: call.a,
              b: call.b,
              c: call.c,
              cid: call.cid,
              cp: call.cp,
              cs: call.cs,
              e: call.e,
              expiry: call.expiry,
              name: call.name,
              oi: parseFloat(call.oi),
              p: call.p,
              s: call.s,
              strike: (call.strike * 100)/100,
              vol: (call.vol.includes('-')) ? 0: parseFloat(call.vol)
            };

            OptionChain.Chain.callsAndPuts.push({
              call: callObject,
              put: putObject
            });
          });
        });
    };


    return OptionChain;

  });
