'use strict';

describe('Service: User', function () {

  // load the service's module
  beforeEach(module('stockTrackAngularJsApp'));

  // instantiate service
  var User, SymbolList;

  var testData = angular.copy(window.testData);

  beforeEach(inject(function (_User_, _SymbolList_) {
    User = _User_;
    User = new User(testData.User);
    SymbolList = _SymbolList_;
    SymbolList.Symbols = testData.Symbols;
  }));


  describe('User.initSymbolList', function () {

    it('creates the initial Symbol List from the User\'s watch list and position list', function () {

      spyOn(SymbolList, 'init');

      User.initSymbolList();

      expect(SymbolList.init).toHaveBeenCalled();

    });
  });


  describe('User.linkPositionSymbols', function () {

    it('links the Symbols in the User.Positions to the Symbols in the SymbolList', function () {
      User.linkPositionSymbols();

      var missingSymbol = false;

      angular.forEach(User.Positions, function(position) {
        if(!position.Symbol) {
          missingSymbol = true;
        }
      });

      expect(User.Positions.length > 0).toBe(true);
      expect(missingSymbol).toBe(false);

    });
  });


  describe('User.linkWatchlistSymbols', function () {

    it('links the Symbols in the User.WatchList to the Symbols in the SymbolList', function () {
      User.linkWatchlistSymbols();

      var missingSymbol = false;

      angular.forEach(User.WatchList, function(watchList) {
        if(!watchList.Symbol) {
          missingSymbol = true;
        }
      });

      expect(User.WatchList.length > 0).toBe(true);
      expect(missingSymbol).toBe(false);

    });
  });

});
