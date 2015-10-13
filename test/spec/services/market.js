'use strict';

describe('Service: Market', function () {

  // load the service's module
  beforeEach(module('stockTrackAngularJsApp'));

  // instantiate service
  var Market;
  var testData = angular.copy(window.testData);

  beforeEach(inject(function (_Market_) {
    Market = _Market_;
  }));

  describe('Market.http', function () {

    it('Market should exist', function () {
      expect(Market.http).not.toBeUndefined();
    });

  });

});
