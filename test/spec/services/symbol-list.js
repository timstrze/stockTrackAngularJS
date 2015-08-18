'use strict';

describe('Service: SymbolList', function () {

  // load the service's module
  beforeEach(module('stockTrackAngularJsApp'));

  // instantiate service
  var SymbolList, repeatSymbol, newSymbol;

  beforeEach(inject(function (_SymbolList_) {
    SymbolList = _SymbolList_;
    repeatSymbol = window.testData.Symbols[0];
    newSymbol = window.testData.newSymbol;
    SymbolList.Symbols = window.testData.Symbols;
  }));


  describe('SymbolList.addSymbol', function () {

    it('should not add a Symbol that is already in the SymbolList.Symbols array', function () {

      var symbolListCopy = angular.copy(SymbolList.Symbols);

      var addSymbol = SymbolList.addSymbol(repeatSymbol);

      expect(addSymbol.Symbol).toBe('AAPL');

      expect(SymbolList.Symbols.length === symbolListCopy.length).toBe(true);

    });

    it('adds a Symbol to the SymbolList.Symbols array', function () {

      var symbolListCopy = angular.copy(SymbolList.Symbols);

      var addSymbol = SymbolList.addSymbol(newSymbol);

      expect(addSymbol.Symbol).toBe('tsla');

      expect(SymbolList.Symbols.length === symbolListCopy.length + 1).toBe(true);

    });
  });



  describe('SymbolList.init', function () {

    it('should create the SymbolList from the watchlist and positions passed in from a User.', function () {

//      SymbolList.init();

    });
  });

});
