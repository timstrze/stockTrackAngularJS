'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.position
 * @description
 * # position
 * Factory in the stockTrackAngularJsApp.
 */
angular.module('stockTrackAngularJsApp')
  .factory('Position', function () {

    var Position = function (properties) {
      var _this = this;
      Object.keys(properties).forEach(function (property) {
        _this[property] = properties[property];
      });
    };

    return Position;

  });
