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

    testData = angular.copy(window.testData);

    //spyOn($interval, cancel);
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

  //it('buy should buy the selected symbol and add to the Positions list', function() {
  //  // Compile a piece of HTML containing the directive
  //  var element = $compile('<user-preferences></user-preferences>')($rootScope);
  //
  //  // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
  //  $rootScope.$digest();
  //
  //  element.isolateScope().openSellModal();
  //  expect($log.debug).toHaveBeenCalled();
  //});

});
