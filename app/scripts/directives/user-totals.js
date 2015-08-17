'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:user-totals
 * @description
 * # userTotals
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

        var calculateTotals = function() {
          var dailyPNL = 0;
          var totalPNL = 0;
          var totalValue = 0;

          angular.forEach($scope.user.Positions, function(position) {
            totalPNL = totalPNL + position.totalPNL;
            dailyPNL = dailyPNL + position.dailyPNL;
            totalValue = totalValue + position.totalValue;
          });

          $scope.dailyPNL = dailyPNL;
          $scope.totalPNL = totalPNL;
          $scope.totalValue = totalValue;
        };

        $scope.$watch('user.Positions', function() {
          if($scope.user && $scope.user.Positions) {
            calculateTotals();
          }
        }, true);

      }
    };
  });
