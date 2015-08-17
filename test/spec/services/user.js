'use strict';

describe('Service: User', function () {

  // load the service's module
  beforeEach(module('stockTrackAngularJsApp'));

  // instantiate service
  var User, SymbolList;

  beforeEach(inject(function (_User_, _SymbolList_) {
    User = _User_;
    User = new User({
      Positions: [
        {
          "symbol":"AXP",
          "buys": [
            {
              "ask":"79.41",
              "quantity":10,
              "created":"2015-08-07 2:07:45 PM"
            },
            {
              "ask":"79.61",
              "quantity":9,
              "created":"2015-08-07 7:05:45 PM"
            }
          ]
        },
        {
          "symbol":"RCL",
          "buys": [
            {
              "ask": "90.41",
              "quantity": 92,
              "created": "2015-08-06 2:05:45 PM"
            }
          ]
        },
        {
          "symbol":"WFM",
          "buys": [
            {
              "ask": "35.80",
              "quantity": 52,
              "created": "2015-08-03 2:05:45 PM"
            }
          ]
        },
        {
          "symbol":"DIS",
          "buys": [
            {
              "ask": "109.80",
              "quantity": 52,
              "created": "2015-08-01 2:05:45 PM"
            }
          ]
        }
      ],
      WatchList: [
        {
          "symbol": "AAPL"
        },
        {
          "symbol": "AXP"
        },
        {
          "symbol": "WFM"
        },
        {
          "symbol": "DIS"
        },
        {
          "symbol": "rcl"
        }
      ]
    });
    SymbolList = _SymbolList_;
    SymbolList.Symbols = window.testData.Symbols;
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
