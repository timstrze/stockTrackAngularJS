'use strict';

describe('Service: SymbolList', function () {

  // load the service's module
  beforeEach(module('stockTrackAngularJsApp'));

  // instantiate service
  var Symbol, SymbolList, repeatSymbol, newSymbol;

  var testData = angular.copy(window.testData);

  beforeEach(inject(function (_SymbolList_, _Symbol_) {
    Symbol = _Symbol_;
    SymbolList = _SymbolList_;
    repeatSymbol = testData.Symbols[0];
    newSymbol = testData.newSymbol;
    SymbolList.Symbols = testData.Symbols;

  }));


  describe('SymbolList.addSymbol', function () {

    it('should not add a Symbol that is already in the SymbolList.Symbols array', function () {

      var symbolListCopy = angular.copy(SymbolList.Symbols);

      var addSymbol = SymbolList.addSymbol(repeatSymbol);

      expect(addSymbol.Symbol).toBe('AAPL');

      expect(SymbolList.Symbols.length === symbolListCopy.length).toBe(true);

    });

    it('should add a Symbol to the SymbolList.Symbols array', function () {

      var symbolListCopy = angular.copy(SymbolList.Symbols);

      var addSymbol = SymbolList.addSymbol(newSymbol);

      expect(addSymbol.Symbol).toBe('tsla');

      expect(SymbolList.Symbols.length === symbolListCopy.length + 1).toBe(true);

    });
  });


  describe('SymbolList.init', function() {

    it('should create the SymbolList from the watchlist and positions passed in from a User.', inject(function ($rootScope, $q) {
      spyOn(SymbolList, 'setInitialSymbols');

      spyOn(Symbol.http, 'all').and.returnValue({
        $promise: $q.when(testData.refreshSymbols)
      });

      SymbolList.init(testData.User.WatchList, testData.User.Positions, testData.User.Preferences);

      expect(Symbol.http.all).toHaveBeenCalled();
      expect(Symbol.http.all.calls.argsFor(0)[0]).toEqual({'list': ['aapl', 'axp', 'wfm', 'dis', 'rcl']});

      expect(SymbolList.WatchList.length > 0).toBe(true);
      expect(SymbolList.Positions.length > 0).toBe(true);
      expect(SymbolList.Preferences).not.toBeNull();

      $rootScope.$apply();

      expect(SymbolList.setInitialSymbols).toHaveBeenCalled();

    }));
  });


  describe('SymbolList.refreshSymbols', function () {

    it('should refresh the SymbolList properties so the angular bindings update.', inject(function ($rootScope, $q) {

      spyOn(Symbol.http, 'all').and.returnValue({
        $promise: $q.when(testData.refreshSymbols)
      });

      SymbolList.refreshSymbols();

      expect(Symbol.http.all).toHaveBeenCalled();
      expect(Symbol.http.all.calls.argsFor(0)[0]).toEqual({'list': ['aapl', 'axp', 'wfm', 'dis', 'rcl', 'tsla']});

      var allEqual = true;

      angular.forEach(SymbolList.Symbols, function(symbol, index) {
        if(symbol.Symbol.Ask !== testData.refreshSymbols[index]) {
          allEqual = false;
        }
      });

      expect(SymbolList.Symbols.length > 0).toBe(true);
      expect(allEqual).toBe(true);

    }));
  });



  describe('SymbolList.removeSymbol', function () {

    it('should remove the Symbol from the SymbolList.Symbols array', function () {

      var symbolListCopy = angular.copy(SymbolList.Symbols);

      SymbolList.removeSymbol(testData.Symbols[0]); //aapl

      expect(SymbolList.Symbols.length === symbolListCopy.length - 1).toBe(true);

    });

    it('should not remove the Symbol from the SymbolList.Symbols array if it is in User.Positions', function () {

      var symbolListCopy = angular.copy(SymbolList.Symbols);

      SymbolList.Positions = testData.Positions;

      SymbolList.removeSymbol(testData.Symbols[1]); //axp

      expect(SymbolList.Symbols.length === symbolListCopy.length).toBe(true);

    });
  });




  describe('SymbolList.setInitialSymbols', function () {

    it('should create the SymbolList from the watchlist and positions passed in from a User', function () {

      SymbolList.Preferences.refreshState = true;
      SymbolList.Symbols = [];

      SymbolList.setInitialSymbols(testData.refreshSymbols);

      expect(SymbolList.interval).not.toBeUndefined();
      expect(SymbolList.Symbols.length > 0).toBe(true);

    });
  });

});
