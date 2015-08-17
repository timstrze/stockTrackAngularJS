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
  }));


  describe('SymbolList.addSymbol', function () {

    SymbolList.Symbols = window.testData.Symbols;

    it('should not add a Symbol that is already in the SymbolList.Symbols array', function () {
      SymbolList.addSymbol(repeatSymbol);

    });

    it('adds a Symbol to the SymbolList.Symbols array', function () {
      SymbolList.addSymbol(newSymbol);

    });
  });

});
