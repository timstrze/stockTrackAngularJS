'use strict';

describe('Directive: color-number', function() {
  var $compile, $rootScope, testData;

  // Load the myApp module, which contains the directive
  beforeEach(module('stockTrackAngularJsApp'));

  // Store references to $rootScope and $compile
  beforeEach(inject(function($templateCache, _$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    testData = angular.copy(window.testData);
  }));

  it('should contain the class name of color-number', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<color-number></color-number>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the template content
    expect(element.html()).toContain('class="color-number"');
  });

  it('should have a negative or positive class depending on the number', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<color-number></color-number>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Set a negative String to test
    element.isolateScope().number = '-100';
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the negative class
    expect(element.find('span').hasClass('negative')).toBe(true);
    // Set a positive String to test
    element.isolateScope().number = '+100';
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the positive class
    expect(element.find('span').hasClass('positive')).toBe(true);
  });
});
