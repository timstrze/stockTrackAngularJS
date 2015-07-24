'use strict';

describe('Service: Symbol', function () {

  // load the service's module
  beforeEach(module('stockTrackAngularJsApp'));

  // instantiate service
  var Symbol;
  beforeEach(inject(function (_Symbol_) {
    Symbol = _Symbol_;
  }));

  it('should do something', function () {
    expect(!!Symbol).toBe(true);
  });

});
