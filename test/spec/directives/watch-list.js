'use strict';

describe('Directive: watch-list', function() {
  var $compile, $rootScope, $log, $window, testData;

  var spyWatch = jasmine.createSpy();

  // Load the myApp module, which contains the directive
  beforeEach(module('stockTrackAngularJsApp'));

  beforeEach(module(function ($provide) {
    $provide.value('$mdSidenav', function (v) {
      return {
        close: spyWatch
      }
    });
  }));

  // Store references to $rootScope and $compile
  beforeEach(inject(function(_$compile_, _$rootScope_, _$log_, _$window_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $window = _$window_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $log = _$log_;

    //Symbol, Constants, localStorageService, $mdSidenav, SymbolList
    testData = angular.copy(window.testData);

    spyOn($log, 'debug');
  }));

  it('should contain the class name of watch-list and contain functions', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<watch-list></watch-list>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the template html content
    expect(element.isolateScope().closeWatchlist).toEqual(jasmine.any(Function));
    expect(element.isolateScope().search).toEqual(jasmine.any(Function));
    expect(element.isolateScope().refreshSymbols).toEqual(jasmine.any(Function));
    expect(element.isolateScope().chooseSymbol).toEqual(jasmine.any(Function));
    expect(element.isolateScope().selectSymbol).toEqual(jasmine.any(Function));
    expect(element.html()).toContain('class="watch-list"');
  });

  it('sell should log the action', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<watch-list></watch-list>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Run the function
    element.isolateScope().closeWatchlist();
    // Tests
    expect(spyWatch).toHaveBeenCalled();
  });

});
