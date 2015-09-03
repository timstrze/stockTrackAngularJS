'use strict';

describe('Directive: sell-button', function() {
  var $compile, $rootScope, $log, $window, testData;

  // Load the myApp module, which contains the directive
  beforeEach(module('stockTrackAngularJsApp'));

  // Store references to $rootScope and $compile
  beforeEach(inject(function(_$compile_, _$rootScope_, _$log_, _$window_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $window = _$window_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $log = _$log_;

    testData = angular.copy(window.testData);

    spyOn($log, 'debug');
  }));

  it('should contain the class name of sell-button and contain functions', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<sell-button></sell-button>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the template html content
    expect(element.isolateScope().openSellModal).toEqual(jasmine.any(Function));
    expect(element.html()).toContain('class="sell-button"');
  });

  it('sell should log the action', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<sell-button></sell-button>')($rootScope);

    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();

    element.isolateScope().openSellModal();
    expect($log.debug).toHaveBeenCalled();
  });

});
