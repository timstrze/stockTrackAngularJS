'use strict';

/**
 * @ngdoc controller
 * @name main.controller:MainCtrl
 * @module main
 * @kind function
 *
 * @description
 * # MainCtrl
 * Controller of the stockTrackAngularJsApp
 */

angular.module('stockTrackAngularJsApp')
  .controller('MainCtrl', function ($scope, $mdSidenav, User) {

    // Default Properties
    $scope.showWatchlist = true;
    $scope.showPositions = false;


    /**
     * @ngdoc function
     * @name MainCtrl.toggleUserPreferences
     * @module main
     * @methodOf main.controller:MainCtrl
     * @kind function
     *
     * @description
     * Toggles the User Preferences Modal.
     *
     */
    $scope.toggleUserPreferences = function () {
      $mdSidenav('user-preferences').toggle();
    };



    /**
     * @ngdoc function
     * @name MainCtrl.watchlistToggle
     * @module main
     * @methodOf main.controller:MainCtrl
     * @kind function
     *
     * @description
     * Toggles the Watch List side bar.
     *
     */
    $scope.watchlistToggle = function () {
      $scope.showWatchlist = true;
      $scope.showPositions = false;
    };


    /**
     * @ngdoc function
     * @name MainCtrl.positionsToggle
     * @module main
     * @methodOf main.controller:MainCtrl
     * @kind function
     *
     * @description
     * Toggles the Positions side bar.
     *
     */
    $scope.positionsToggle = function () {
      $scope.showWatchlist = false;
      $scope.showPositions = true;
    };


    /**
     * @ngdoc function
     * @name MainCtrl.getUser
     * @module main
     * @methodOf main.controller:MainCtrl
     * @kind function
     *
     * @description
     * Initiates the application by getting the User.
     *
     */
    $scope.getUser = function() {
      // Gets the user
      User.http.get({}, function (results) {
        // Creates the User Object and sets the scope variable
        $scope.User = new User(results);
        // Initiates the Symbol list for the watchlist and positions
        $scope.User.initSymbolList().$promise.then(function () {
          // Set the Symbols in the position list
          $scope.User.updatePositionSymbols();
          // Set the Symbols in the watch list
          $scope.User.updateWatchlistSymbols();
          // Set the first symbol in the watchlist as the selected symbol
          $scope.User.selectedSymbol = $scope.User.WatchList[0].Symbol;
        });
      });
    };


    // Watching the loading flag for true
    $scope.$on('loader_show', function () {
      $scope.isLoading = true;
    });


    // Watching the loading flag for false
    $scope.$on('loader_hide', function () {
      $scope.isLoading = false;
    });




    // Init the app
    $scope.getUser();

  });
