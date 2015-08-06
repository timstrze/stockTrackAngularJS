'use strict';

/**
 * @ngdoc function
 * @name stockTrackAngularJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stockTrackAngularJsApp
 */
angular.module('stockTrackAngularJsApp')
  .controller('MainCtrl', function ($scope, $mdSidenav, User) {

    $scope.User = User;

    $scope.showWatchlist = true;

    $scope.toggleRight = function() {
      $mdSidenav('right').toggle()
        .then(function(){});
    };

    $scope.closeRight = function() {
      $mdSidenav('right').close()
        .then(function(){});
    };

    $scope.toggleWatchlist = function() {
      $scope.showWatchlist = !$scope.showWatchlist;
    };

    User.getWatchListData();

    $scope.$on('loader_show', function () {
      $scope.isLoading = true;
    });

    $scope.$on('loader_hide', function () {
      $scope.isLoading = false;
    });

  });
