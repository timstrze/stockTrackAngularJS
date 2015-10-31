'use strict';

/**
 * @ngdoc controller
 * @name stockTrackAngularJsApp.controller:MainController
 * @kind function
 *
 * @description
 * # MainController
 * Controller of the stockTrackAngularJsApp
 */

angular.module('stockTrackAngularJsApp')
  .controller('MainController', function ($scope, $mdSidenav, $mdMedia, Constants, Market, User) {

    // Default Properties
    $scope.showWatchlist = true;
    $scope.showPositions = false;




    /**
     * @ngdoc function
     * @name MainController.init
     * @module main
     * @methodOf stockTrackAngularJsApp.controller:MainController
     * @kind function
     *
     * @description
     * Initiates the application
     *
     */
    $scope.init = function () {
      Market.init();
      // Gets the user
      $scope.getUser();
    };



    /**
     * @ngdoc function
     * @name MainController.getUser
     * @module main
     * @methodOf stockTrackAngularJsApp.controller:MainController
     * @kind function
     *
     * @description
     * Gets the User.
     *
     */
    $scope.getUser = function () {
      // Gets the user
      User.http.get({}, function (results) {
        // Creates the User Object and sets the scope variable
        $scope.User = new User(results);
        // Initiates the Symbol list for the watchlist and positions
        $scope.User.initSymbolList().then(function () {
          //* Link the Symbols in the position list to the Symbols in the SymbolList.
          $scope.User.linkPositionSymbols();
          // Set the Symbols in the watch list
          $scope.User.linkWatchlistSymbols();
          // Set the first symbol in the watchlist as the selected symbol
          $scope.User.selectedSymbol = $scope.User.WatchList[0].Symbol;
          //
          var selectedTab = Constants.historicalDateRange()[$scope.User.Preferences.selectedHistoricalIndex || 2];
          //
          $scope.User.selectedSymbol.getHistoricalData(selectedTab.startDate, selectedTab.endDate);
          $scope.User.selectedSymbol.getSymbolNews();
        });
      });
    };




    /**
     * @ngdoc function
     * @name MainController.positionsToggle
     * @module main
     * @methodOf stockTrackAngularJsApp.controller:MainController
     * @kind function
     *
     * @description
     * Toggles the Positions side bar.
     *
     */
    $scope.positionsToggle = function () {
      $scope.showWatchlist = false;
      $scope.showPositions = true;
      // Only toggle the modal if small size
      if($mdMedia('sm') || $mdMedia('md')) {
        $mdSidenav('positions').toggle();
      }
    };




    /**
     * @ngdoc function
     * @name MainController.toggleUserPreferences
     * @module main
     * @methodOf stockTrackAngularJsApp.controller:MainController
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
     * @name MainController.watchlistToggle
     * @module main
     * @methodOf stockTrackAngularJsApp.controller:MainController
     * @kind function
     *
     * @description
     * Toggles the Watch List side bar.
     *
     */
    $scope.watchlistToggle = function () {
      $scope.showWatchlist = true;
      $scope.showPositions = false;
      // Only toggle the modal if small size
      if($mdMedia('sm') || $mdMedia('md')) {
        $mdSidenav('watch-list').toggle();
      }
    };




    /**
     * @ngdoc function
     * @name MainController.loader_show
     * @module main
     * @eventOf stockTrackAngularJsApp.controller:MainController
     * @kind event
     *
     * @description
     * Watching the loading flag for true.
     *
     */
    $scope.$on('loader_show', function () {
      $scope.isLoading = true;
    });




    /**
     * @ngdoc function
     * @name MainController.loader_hide
     * @module main
     * @eventOf stockTrackAngularJsApp.controller:MainController
     * @kind event
     *
     * @description
     * Watching the loading flag for false.
     *
     */
    $scope.$on('loader_hide', function () {
      $scope.isLoading = false;
    });




    /**
     * @description
     * Initiates the application.
     *
     */
    $scope.init();

  });
