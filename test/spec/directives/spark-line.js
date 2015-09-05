'use strict';

describe('Directive: sparkLine', function () {

  // load the directive's module
  beforeEach(module('stockTrackAngularJsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<spark-line></spark-line>');
    element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the sparkLine directive');
  }));
});
