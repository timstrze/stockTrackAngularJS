'use strict';

describe('Service: Position', function () {

  // load the service's module
  beforeEach(module('stockTrackAngularJsApp'));

  // instantiate service
  var Position;
  beforeEach(inject(function (_Position_) {
    Position = _Position_;
  }));

  it('should do something', function () {
    expect(!!Position).toBe(true);
  });

});
