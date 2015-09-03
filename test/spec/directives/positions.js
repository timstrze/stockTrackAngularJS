'use strict';

describe('Directive: positions', function() {
  var $compile, $rootScope, SymbolList, $window, testData;

  // Load the myApp module, which contains the directive
  beforeEach(module('stockTrackAngularJsApp'));

  // Store references to $rootScope and $compile
  beforeEach(inject(function(_$compile_, _$rootScope_, _$window_, _SymbolList_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $window = _$window_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    SymbolList = _SymbolList_;
    spyOn(SymbolList, 'refreshSymbols');
    // Make a copy of the test data
    testData = angular.copy(window.testData);
  }));

  it('should contain the class name of positions and contain functions', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<positions></positions>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the template html content
    expect(element.isolateScope().totalPositions).toEqual(jasmine.any(Function));
    expect(element.isolateScope().refreshSymbols).toEqual(jasmine.any(Function));
    expect(element.html()).toContain('class="positions"');
  });

  it('totalPositions should calculate the PNL for the User Positions', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<positions></positions>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Set the default scope data
    element.isolateScope().positions = testData.Positions;
    // Call the Function
    element.isolateScope().totalPositions();
    // Tests
    expect(element.isolateScope().positions[0].dailyPNL).toBe(4.940000000000055);
    expect(element.isolateScope().positions[0].totalPNL).toBe(33.350000000000136);
    expect(element.isolateScope().positions[0].totalQuantity).toBe(19);
    expect(element.isolateScope().positions[0].totalValue).toBe(1543.94);

    expect(element.isolateScope().positions[1].dailyPNL).toBe(-26.68000000000029);
    expect(element.isolateScope().positions[1].totalPNL).toBe(-20.23999999999978);
    expect(element.isolateScope().positions[1].totalQuantity).toBe(92);
    expect(element.isolateScope().positions[1].totalValue).toBe(8297.48);
  });

  it('refreshSymbols should call the SymbolList.refreshSymbols method', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<positions></positions>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Call the Function
    element.isolateScope().refreshSymbols();
    // Tests
    expect(SymbolList.refreshSymbols).toHaveBeenCalled();
  });

});
