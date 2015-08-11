'use strict';

/**
 * @ngdoc function
 * @name stockTrackAngularJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stockTrackAngularJsApp
 */
angular.module('stockTrackAngularJsApp')
  .controller('MainCtrl', function ($scope, $mdSidenav, $mdUtil, $log, User, SymbolList) {

    $scope.showWatchlist = true;
    $scope.showPositions = false;

    $scope.toggleUserPrefs = function () {
      $mdSidenav('user-preferences').toggle()
        .then(function () {
        });
    };

    $scope.closeUserPrefs = function () {
      $mdSidenav('user-preferences').close()
        .then(function () {
        });
    };

    $scope.watchlistToggle = function () {
      $scope.showWatchlist = true;
      $scope.showPositions = false;
    };

    $scope.positionsToggle = function () {
      $scope.showWatchlist = false;
      $scope.showPositions = true;
    };


    $scope.$on('loader_show', function () {
      $scope.isLoading = true;
    });

    $scope.$on('loader_hide', function () {
      $scope.isLoading = false;
    });


    // Init App
    User.http.get({}, function (results) {
      $scope.User = new User(results);
      //
      $scope.User.initSymbolList().$promise.then(function(results) {
        $scope.User.updatePositionSymbols();
        $scope.User.updateWatchlistSymbols();
        $scope.User.selectedSymbol = $scope.User.WatchList[0].Symbol;
      });
    });

  });
