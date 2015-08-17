'use strict';

describe('Service: User', function () {

  // load the service's module
  beforeEach(module('stockTrackAngularJsApp'));

  // instantiate service
  var User, SymbolList;

  beforeEach(inject(function (_User_, _SymbolList_) {
    User = _User_;
    SymbolList = _SymbolList_;
  }));


  describe('User.initSymbolList', function() {

    it('sets the showWatchlist to true and showPositions to false', function() {
//      SymbolList.init should have been called

    });
  });


  describe('User.updatePositionSymbols', function() {

    it('sets the showWatchlist to true and showPositions to false', function() {
//      SymbolList.init should have been called

    });
  });


  describe('User.updateWatchlistSymbols', function() {

    it('sets the showWatchlist to true and showPositions to false', function() {
//      SymbolList.init should have been called

    });
  });

});
