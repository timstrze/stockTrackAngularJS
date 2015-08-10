'use strict';

/**
 * @ngdoc function
 * @name stockTrackAngularJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stockTrackAngularJsApp
 */
angular.module('stockTrackAngularJsApp')
  .controller('MainCtrl', function ($scope, $mdSidenav, $mdUtil, $log, User) {

    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      },300);
      return debounceFn;
    }





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


    User.http.get({}, function (results) {
      $scope.User = new User(results);

      $scope.User.getWatchListData();
    });


    $scope.$on('loader_show', function () {
      $scope.isLoading = true;
    });

    $scope.$on('loader_hide', function () {
      $scope.isLoading = false;
    });

  });
