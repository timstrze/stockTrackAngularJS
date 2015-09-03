'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:sell-button
 * @description
 * # sellButton
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
