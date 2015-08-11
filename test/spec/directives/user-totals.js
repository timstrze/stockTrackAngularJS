'use strict';

describe('Directive: userTotals', function () {

  // load the directive's module
  beforeEach(module('stockTrackAngularJsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<user-totals></user-totals>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the userTotals directive');
  }));
});
