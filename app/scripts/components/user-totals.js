'use strict';

/**
 * @ngdoc component
 * @name stockTrackAngularJsApp.component:user-totals
 * @element user-totals
 * @restrict E
 *
 * @description
 * # userTotals
 * component to calculate the daily and total PNL and the User's total value
 *
 * @param {Object} user User Object
 */
angular.module('stockTrackAngularJsApp')
  .component('userTotals', {
      bindings: {
        user: '<'
      },
      templateUrl: 'views/components/user-totals.html',
      restrict: 'E',
      controller: function($scope) {

        var _this = this;

        /**
         * @ngdoc function
         * @name calculateTotals
         * @methodOf stockTrackAngularJsApp.component:user-totals
         *
         * @description
         * Calculates the daily and total PNL and the User's total value. Adds the Positions total PNL to the User's total PNL.
         * Adds the Positions daily PNL to the User's daily PNL. Adds the Positions total value to the User's total value.
         *
         */
        this.calculateTotals = function() {
          // Set the default values
          var dailyPNL = 0;
          var totalPNL = 0;
          var totalValue = 0;
          // Loop over the User Positions
          angular.forEach(this.user.Positions, function(position) {
            // Add the Positions total PNL to the User's total PNL
            totalPNL = totalPNL + position.totalPNL;
            // Add the Positions daily PNL to the User's daily PNL
            dailyPNL = dailyPNL + position.dailyPNL;
            // Add the Positions total value to the User's total value
            totalValue = totalValue + position.totalValue;
          });
          // Set the scope values
          this.dailyPNL = dailyPNL;
          this.totalPNL = totalPNL;
          this.totalValue = totalValue;
        };


        /**
         * @ngdoc function
         * @name $watch
         * @eventOf stockTrackAngularJsApp.component:user-totals
         *
         * @description
         * Watches the User Positions calls the calculateTotals Function.
         *
         */
        $scope.$watch('$ctrl.user.Positions', function() {
          if(_this.user && _this.user.Positions) {
            _this.calculateTotals();
          }
        }, true);

      }
  });
