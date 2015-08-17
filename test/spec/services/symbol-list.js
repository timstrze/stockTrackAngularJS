'use strict';

describe('Service: SymbolList', function () {

  // load the service's module
  beforeEach(module('stockTrackAngularJsApp'));

  // instantiate service
  var SymbolList, testSymbol;

  beforeEach(inject(function (_SymbolList_) {
    SymbolList = _SymbolList_;
    testSymbol = window.testData.Symbols[0];
  }));


  describe('SymbolList.removeSymbol', function () {

    it('links the Symbols in the User.WatchList to the Symbols in the SymbolList', function () {
      SymbolList.removeSymbol(testSymbol);

    });
  });

});
