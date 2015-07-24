'use strict';

describe('Service: LoadingInterceptor', function () {

  // load the service's module
  beforeEach(module('stockTrackAngularJsApp'));

  // instantiate service
  var LoadingInterceptor;
  beforeEach(inject(function (_LoadingInterceptor_) {
    LoadingInterceptor = _LoadingInterceptor_;
  }));

  it('should do something', function () {
    expect(!!LoadingInterceptor).toBe(true);
  });

});
