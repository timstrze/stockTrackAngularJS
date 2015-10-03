'use strict';

describe('Directive: watch-list-details', function() {
  var $compile, $rootScope, $window, $mdDialog, testData, SymbolList;

  var spyWatch = jasmine.createSpy();

  // Load the myApp module, which contains the directive
  beforeEach(module('stockTrackAngularJsApp'));

  beforeEach(module(function ($provide) {
    $provide.value('$mdSidenav', function () {
      return {
        toggle: spyWatch
      };
    });
  }));

  // Store references to $rootScope and $compile
  beforeEach(inject(function(_$compile_, _$rootScope_, _$window_, _$mdDialog_, _SymbolList_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $window = _$window_;
    $compile = _$compile_;
    $mdDialog = _$mdDialog_;
    $rootScope = _$rootScope_;
    SymbolList = _SymbolList_;
    // Create spies
    spyOn(SymbolList, 'removeSymbol');
    spyOn($mdDialog, 'confirm').and.callThrough();
    // Make a copy of the test data
    testData = angular.copy(window.testData);
  }));

  //it('should contain the class name of watch-list-details and contain functions', function() {
  //  // Compile a piece of HTML containing the directive
  //  var element = $compile('<watch-list-details></watch-list-details>')($rootScope);
  //  // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
  //  $rootScope.$digest();
  //  // Check that the compiled element contains the template html content
  //  expect(element.isolateScope().toggleWatchlist).toEqual(jasmine.any(Function));
  //  expect(element.isolateScope().historicalTabs).not.toBeUndefined();
  //  expect(element.html()).toContain('class="watch-list-details"');
  //});


  //it('toggleWatchlist should toggle the watch list side navigation bar', function() {
  //  // Compile a piece of HTML containing the directive
  //  var element = $compile('<watch-list-details></watch-list-details>')($rootScope);
  //  // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
  //  $rootScope.$digest();
  //  // Call the Function
  //  element.isolateScope().toggleWatchlist();
  //  // Tests
  //  expect(spyWatch).toHaveBeenCalled();
  //});

});
