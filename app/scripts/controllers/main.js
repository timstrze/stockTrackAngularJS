'use strict';

/**
 * @ngdoc function
 * @name stockTrackAngularJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stockTrackAngularJsApp
 */
angular.module('stockTrackAngularJsApp')
  .controller('MainCtrl', function ($scope, $mdSidenav, $log, User) {

    $scope.User = User;

    $scope.toggleLeft = function() {
      $mdSidenav('left').toggle()
        .then(function(){
          $log.debug("toggle left is done");
        });
    };

    $scope.toggleRight = function() {
      $mdSidenav('right').toggle()
        .then(function(){
          $log.debug("toggle RIGHT is done");
        });
    };

    $scope.closeLeft = function() {
      $mdSidenav('left').close()
        .then(function(){
          $log.debug("close LEFT is done");
        });
    };

    $scope.closeRight = function() {
      $mdSidenav('right').close()
        .then(function(){
          $log.debug("close RIGHT is done");
        });
    };

    User.getWatchListData();

    $scope.$on('loader_show', function () {
      $scope.isLoading = true;
    });

    $scope.$on('loader_hide', function () {
      $scope.isLoading = false;
    });

  });
