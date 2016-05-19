'use strict';

describe('Filter: orderWatchList', function () {

  // load the filter's module
  beforeEach(module('stockTrackAngularJsApp'));

  // initialize a new instance of the filter before each test
  var orderWatchList;
  beforeEach(inject(function ($filter) {
    orderWatchList = $filter('orderWatchList');
  }));

  it('should return the input prefixed with "orderWatchList filter:"', function () {
    var text = 'angularjs';
    expect(orderWatchList(text)).toBe('orderWatchList filter: ' + text);
  });

});
