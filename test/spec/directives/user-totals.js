'use strict';

describe('Directive: user-totals', function() {
  var $compile, $rootScope, $window, testData;

  // Load the myApp module, which contains the directive
  beforeEach(module('stockTrackAngularJsApp'));

  // Store references to $rootScope and $compile
  beforeEach(inject(function(_$compile_, _$rootScope_, _$window_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $window = _$window_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    // Make a copy of the test data
    testData = angular.copy(window.testData);
  }));

  it('should contain the class name of user-totals and contain functions', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<user-totals></user-totals>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the template html content
    expect(element.isolateScope().calculateTotals).toEqual(jasmine.any(Function));
    expect(element.html()).toContain('class="user-totals"');
  });

  it('buy should buy the selected symbol and add to the Positions list', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<user-totals></user-totals>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Set the default scope data
    element.isolateScope().user = testData.User;
    element.isolateScope().user.Positions = testData.Positions;
    // Call the Function
    element.isolateScope().calculateTotals();
    // Tests
    expect(element.isolateScope().dailyPNL).toBe(-118.97999999999979);
    expect(element.isolateScope().totalPNL).toBe(-232.84999999999923);
    expect(element.isolateScope().totalValue).toBe(17166.66);
  });

});
