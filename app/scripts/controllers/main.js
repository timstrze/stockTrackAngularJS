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
  .controller('MainController', function ($scope, $mdSidenav, $mdMedia, Constants, Market, User, Accounts) {

    var _this = this;

    // Default Properties
    this.showWatchlist = true;
    this.showPositions = false;
    



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
    this.init = function () {
      Market.init();
      // Gets the user
      this.getUser();
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
    this.getUser = function () {
      // Gets the user
      User.http.get({}, function (results) {
        // Creates the User Object and sets the scope variable
        _this.User = new User(results);
        // Create an empty account array
        var accountObjs = [];
        // Sets the Accounts Object
        angular.forEach(_this.User.Accounts, function(account) {
          // Add the new Account object to the array
          accountObjs.push(new Accounts(account));
        });
        // Set the new Accounts Objects
        _this.User.Accounts = accountObjs;
        _this.User.selectedAccount = _this.User.Accounts[0];
        _this.User.selectedAccount.selectedWatchList = _this.User.selectedAccount.WatchLists[0];
        // Set the theme from the Constants Object so it will fill out the form on first load
        _this.User.Preferences.theme = Constants.themeTypes.find(function (theme) {
          return theme.slug === _this.User.Preferences.theme.slug;
        });
        // Initiates the Symbol list for the watchlist and positions
        _this.User.initSymbolList().then(function () {
          //* Link the Symbols in the position list to the Symbols in the SymbolList.
          _this.User.linkPositionSymbols();
          // Set the Symbols in the watch list
          _this.User.linkWatchlistSymbols();
          // Set the first symbol in the watchlist as the selected symbol
          _this.User.selectSymbol(_this.User.selectedAccount.selectedWatchList.Symbols[0]);
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
    this.positionsToggle = function () {
      this.showWatchlist = false;
      this.showPositions = true;
      // Only toggle the modal if small size
      if(!$mdMedia('gt-md')) {
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
    this.toggleUserPreferences = function () {
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
    this.watchlistToggle = function () {
      this.showWatchlist = true;
      this.showPositions = false;
      // Only toggle the modal if small size
      if(!$mdMedia('gt-md')) {
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
      _this.isLoading = true;
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
      _this.isLoading = false;
    });




    /**
     * @description
     * Initiates the application.
     *
     */
    this.init();

  });
