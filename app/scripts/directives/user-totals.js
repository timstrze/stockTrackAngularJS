'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:user-totals
 * @element user-totals
 * @restrict E
 *
 * @description
 * # userTotals
 * Directive to calculate the daily and total PNL and the User's total value
 *
 * @param {Object} user User Object
 */
angular.module('stockTrackAngularJsApp')
  .directive('userTotals', function () {
    return {
      scope: {
        user: '='
      },
      templateUrl: 'views/directives/user-totals.html',
      restrict: 'E',
      controller: function($scope) {


        /**
         * @ngdoc function
         * @name calculateTotals
         * @methodOf stockTrackAngularJsApp.directive:user-totals
         *
         * @description
         * Calculates the daily and total PNL and the User's total value. Adds the Positions total PNL to the User's total PNL.
         * Adds the Positions daily PNL to the User's daily PNL. Adds the Positions total value to the User's total value.
         *
         */
        $scope.calculateTotals = function() {
          // Set the default values
          var dailyPNL = 0;
          var totalPNL = 0;
          var totalValue = 0;
          // Loop over the User Positions
          angular.forEach($scope.user.Positions, function(position) {
            // Add the Positions total PNL to the User's total PNL
            totalPNL = totalPNL + position.totalPNL;
            // Add the Positions daily PNL to the User's daily PNL
            dailyPNL = dailyPNL + position.dailyPNL;
            // Add the Positions total value to the User's total value
            totalValue = totalValue + position.totalValue;
          });
          // Set the scope values
          $scope.dailyPNL = dailyPNL;
          $scope.totalPNL = totalPNL;
          $scope.totalValue = totalValue;
        };


        /**
         * @ngdoc function
         * @name $watch
         * @eventOf stockTrackAngularJsApp.directive:user-totals
         *
         * @description
         * Watches the User Positions calls the calculateTotals Function.
         *
         */
        $scope.$watch('user.Positions', function() {
          if($scope.user && $scope.user.Positions) {
            $scope.calculateTotals();
          }
        }, true);

      }
    };
  });
