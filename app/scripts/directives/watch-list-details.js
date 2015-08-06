'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:watch-list-details
 * @description
 * # watchListDetails
 */
angular.module('stockTrackAngularJsApp')
  .directive('watchListDetails', function (Constants, localStorageService, $mdSidenav, $log) {
    return {
      restrict: 'E',
      scope: {
        symbol: '=',
        preferences: '='
      },
      templateUrl: 'views/directives/watch-list-details.html',
      controller: function ($scope) {
        $scope.Constants = Constants;

        $scope.toggleWatchlist = function() {
          $mdSidenav('watch-list').toggle()
            .then(function(){
              $log.debug("toggle left is done");
            });
        };
      }
    };
  });
