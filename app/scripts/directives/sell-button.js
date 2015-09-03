'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:sell-button
 *
 * @element div
 * @function
 *
 * @description
 * # sellButton
 * Directive to open the buy modal.
 *
 * @param {Object} user User Object
 * @param {Object} symbol Symbol Object that the User is going to sell
 */
angular.module('stockTrackAngularJsApp')
  .directive('sellButton', function ($log) {
    return {
      scope: {
        symbol: '=',
        user: '='
      },
      templateUrl: 'views/directives/sell-button.html',
      restrict: 'E',
      controller: function($scope) {


        /**
         * @ngdoc function
         * @name openSellModal
         * @methodOf stockTrackAngularJsApp.directive:sell-button
         *
         * @description
         * Opens the sell modal
         *
         */
        $scope.openSellModal = function (event) {
          $log.debug('sell', event);
        };

      }
    };
  });
