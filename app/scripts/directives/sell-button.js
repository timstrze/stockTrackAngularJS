'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:sellButton
 * @description
 * # sellButton
 */
angular.module('stockTrackAngularJsApp')
  .directive('sellButton', function () {
    return {
      scope: {
        symbol: '=',
        user: '='
      },
      templateUrl: 'views/directives/sell-button.html',
      restrict: 'E',
      controller: function($scope, $log) {


        /**
         * @ngdoc function
         * @name openSellModal
         * @methodOf stockTrackAngularJsApp.directive:sellButton
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
