'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.service:Accounts
 * @description
 * # Accounts
 * Accounts service that contains all the properties and methods for a Accounts
 *
 */
angular.module('stockTrackAngularJsApp')
  .factory('Accounts', function () {


    var Accounts = function (properties) {
      var _this = this;
      Object.keys(properties).forEach(function (property) {
        _this[property] = properties[property];
      });
    };


    return Accounts;

  });
