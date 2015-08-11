'use strict';

describe('Service: symbolList', function () {

  // load the service's module
  beforeEach(module('stockTrackAngularJsApp'));

  // instantiate service
  var symbolList;
  beforeEach(inject(function (_symbolList_) {
    symbolList = _symbolList_;
  }));

  it('should do something', function () {
    expect(!!symbolList).toBe(true);
  });

});
