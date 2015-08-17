'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:symbolTitle
 * @description
 * # symbolTitle
 */
angular.module('stockTrackAngularJsApp')
  .directive('symbolTitle', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.text('this is the symbolTitle directive');
      }
    };
  });
