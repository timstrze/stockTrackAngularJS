'use strict';

describe('Filter: sortPositions', function () {

  // load the filter's module
  beforeEach(module('stockTrackAngularJsApp'));

  // initialize a new instance of the filter before each test
  var sortPositions;
  beforeEach(inject(function ($filter) {
    sortPositions = $filter('sortPositions');
  }));

  it('should return the input prefixed with "sortPositions filter:"', function () {
    var text = 'angularjs';
    expect(sortPositions(text)).toBe('sortPositions filter: ' + text);
  });

});
