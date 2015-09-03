'use strict';

describe('MainController', function() {
  beforeEach(module('stockTrackAngularJsApp'));

  var $controller, $scope, controller, $mdSidenav, User;

  var spyWatch = jasmine.createSpy();

  // Load the myApp module, which contains the directive
  beforeEach(module('stockTrackAngularJsApp'));

  beforeEach(module(function ($provide) {
    $provide.value('$mdSidenav', function (v) {
      return {
        toggle: spyWatch
      }
    });
  }));

  beforeEach(inject(function(_$controller_, _User_, _$mdSidenav_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;

    $mdSidenav = _$mdSidenav_;

    User = _User_;

    $scope = {
      $on: function() {}
    };

    controller = $controller('MainController', { $scope: $scope, $mdSidenav: $mdSidenav });

    spyOn($scope, '$on');
    spyOn(User.http, 'get');
  }));

  describe('MainController $scope.watchlistToggle', function() {

    it('sets the showWatchlist to true and showPositions to false', function() {

      $scope.watchlistToggle();
      expect($scope.showWatchlist).toEqual(true);
      expect($scope.showPositions).toEqual(false);
    });
  });

  describe('MainController $scope.positionsToggle', function() {

    it('sets the showWatchlist to false and showPositions to true', function() {

      $scope.positionsToggle();
      expect($scope.showWatchlist).toEqual(false);
      expect($scope.showPositions).toEqual(true);
    });
  });

  describe('MainController $scope.getUser', function() {

    it('get the user and initiates the symbol list', function() {

      $scope.getUser();
      expect(User.http.get).toHaveBeenCalled();

    });
  });

  describe('MainController $scope.toggleUserPreferences', function() {

    it('sets the showWatchlist to false and showPositions to true', function() {

      $scope.toggleUserPreferences();
      expect(spyWatch).toHaveBeenCalled();

    });
  });
});
