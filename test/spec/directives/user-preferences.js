'use strict';

describe('Directive: user-preferences', function() {
  var $compile, $rootScope, $interval, SymbolList, $window, testData;

  // Load the myApp module, which contains the directive
  beforeEach(module('stockTrackAngularJsApp'));

  // Store references to $rootScope and $compile
  beforeEach(inject(function(_$compile_, _$rootScope_, _$window_, _$interval_, _SymbolList_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $window = _$window_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $interval = _$interval_;
    SymbolList = _SymbolList_;
    // Set default function
    SymbolList.refreshSymbols = function() {};
    // Spy on the $interval function
    spyOn($interval, 'cancel');
    // Make a copy of the test data
    testData = angular.copy(window.testData);
  }));

  it('should contain the class name of user-preferences and contain functions', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<user-preferences></user-preferences>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the template html content
    expect(element.isolateScope().symbolRefreshChange).toEqual(jasmine.any(Function));
    expect(element.html()).toContain('class="user-preferences"');
  });

  it('buy should buy the selected symbol and add to the Positions list', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<user-preferences></user-preferences>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Set the default scope data
    element.isolateScope().user = testData.User;
    element.isolateScope().user.Preferences.refreshState = false;
    // Call the Function
    element.isolateScope().symbolRefreshChange();
    // Tests
    expect($interval.cancel).toHaveBeenCalled();
    expect(SymbolList.interval).toBeUndefined();
  });

  it('buy should buy the selected symbol and add to the Positions list', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<user-preferences></user-preferences>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Set the default scope data
    element.isolateScope().user = testData.User;
    element.isolateScope().user.Preferences.refreshState = true;
    element.isolateScope().user.Preferences.refreshRate = 30000;
    // Clean up after we are done
    element.isolateScope().$on('$destroy', function () {
      // cancel the interval and timeout
      $interval.cancel(SymbolList.interval);
    });
    // Call the function
    element.isolateScope().symbolRefreshChange();
    // Tests
    expect($interval.cancel).toHaveBeenCalled();
    expect(SymbolList.interval).not.toBeUndefined();
  });

});
