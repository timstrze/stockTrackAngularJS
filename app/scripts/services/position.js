'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.Position
 * @description
 * # position
 * Factory in the stockTrackAngularJsApp.
 */
angular.module('stockTrackAngularJsApp')
  .factory('Position', function () {

    var Position = function (properties) {
      // Create a reference to this
      var _this = this;
      // Loop over the keys of the object passed in
      Object.keys(properties).forEach(function (property) {
        // Set the properties of this Symbol
        _this[property] = properties[property];
      });
    };

    return Position;

  });
