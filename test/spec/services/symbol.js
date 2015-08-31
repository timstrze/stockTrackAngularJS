'use strict';

describe('Service: Symbol', function () {

  // load the service's module
  beforeEach(module('stockTrackAngularJsApp'));

  // instantiate service
  var Symbol;

  var testData = angular.copy(window.testData);

  beforeEach(inject(function (_Symbol_) {
    Symbol = _Symbol_;
    // https://jslinterrors.com/do-not-use-a-as-a-constructor
    var SSymbol = Symbol;
    // Create a new Symbol and save a reference to return
    Symbol = new SSymbol({'Symbol':'aapl'});
  }));


  describe('Symbol.getHistoricalData', function () {

    it('should get the historical data that the graphs need', inject(function ($rootScope, $q) {

      spyOn(Symbol.http, 'details').and.returnValue( {
        $promise: $q.when({'query':{'results':{'quote':testData.Symbols[0]}}})
      });

      Symbol.getHistoricalData('2015-05-18', '2015-08-18');

      expect(Symbol.http.details).toHaveBeenCalled();
      expect(Symbol.http.details.calls.argsFor(0)[0]).toEqual({'symbol':'aapl','startDate':'2015-05-18','endDate':'2015-08-18'});

      $rootScope.$apply();

      expect(Symbol.historicalData).not.toBeUndefined();

    }));
  });


});
