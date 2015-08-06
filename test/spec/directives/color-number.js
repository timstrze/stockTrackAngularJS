'use strict';

describe('Directive: colorNumber', function () {

  // load the directive's module
  beforeEach(module('stockTrackAngularJsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<color-number></color-number>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the colorNumber directive');
  }));
});
