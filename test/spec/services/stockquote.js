'use strict';

describe('Service: StockQuote', function () {

  // load the service's module
  beforeEach(module('stockTrackAngularJsApp'));

  // instantiate service
  var StockQuote;
  beforeEach(inject(function (_StockQuote_) {
    StockQuote = _StockQuote_;
  }));

  it('should do something', function () {
    expect(!!StockQuote).toBe(true);
  });

});
