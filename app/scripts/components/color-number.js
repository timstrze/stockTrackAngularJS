'use strict';

/**
 * @ngdoc component
 * @name stockTrackAngularJsApp.component:color-number
 * @element color-number
 * @restrict E
 *
 * @description
 * Display the number with a positive or negative class.
 *
 * @param {Number} number Number to test if positive or negative
 */
angular.module('stockTrackAngularJsApp')
  .component('colorNumber', {
      bindings: {
        number: '<'
      },
      templateUrl: 'views/components/color-number.html',
      restrict: 'E'
  });
