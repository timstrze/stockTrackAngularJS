'use strict';

describe('Directive: watch-list', function() {
  var $compile, $rootScope, SymbolList, Symbol, $window, testData;

  var spyWatch = jasmine.createSpy();

  // Load the myApp module, which contains the directive
  beforeEach(module('stockTrackAngularJsApp'));

  beforeEach(module(function ($provide) {
    $provide.value('$mdSidenav', function (v) {
      return {
        close: spyWatch
      }
    });
  }));

  // Store references to $rootScope and $compile
  beforeEach(inject(function(_$compile_, _$rootScope_, _$window_, _Symbol_, _SymbolList_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $window = _$window_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    SymbolList = _SymbolList_;
    Symbol = _Symbol_;
    spyOn(SymbolList, 'refreshSymbols');

    //Symbol, Constants, localStorageService, $mdSidenav, SymbolList
    testData = angular.copy(window.testData);
  }));

  it('should contain the class name of watch-list and contain functions', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<watch-list></watch-list>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the template html content
    expect(element.isolateScope().closeWatchlist).toEqual(jasmine.any(Function));
    expect(element.isolateScope().search).toEqual(jasmine.any(Function));
    expect(element.isolateScope().refreshSymbols).toEqual(jasmine.any(Function));
    expect(element.isolateScope().chooseSymbol).toEqual(jasmine.any(Function));
    expect(element.isolateScope().selectSymbol).toEqual(jasmine.any(Function));
    expect(element.html()).toContain('class="watch-list"');
  });

  it('closeWatchlist should log the action', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<watch-list></watch-list>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Run the function
    element.isolateScope().closeWatchlist();
    // Tests
    expect(spyWatch).toHaveBeenCalled();
  });

  it('search should call the SymbolList.refreshSymbols method', inject(function($q) {
    // Create a spy
    spyOn(Symbol.http, 'search').and.returnValue({
      // Return a successful promise
      $promise: $q.when(testData.searchResults)
    });
    // Compile a piece of HTML containing the directive
    var element = $compile('<watch-list></watch-list>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Call the Function
    element.isolateScope().search('aapl').then(function(results) {
      expect(results[0].value).toBe('Alcoa Inc. Common Stock');
      expect(results[0].display).toBe('Alcoa Inc. Common Stock');
    });
    // Make sure Promises go out
    $rootScope.$apply();
    // Tests
    expect(Symbol.http.search).toHaveBeenCalled();
  }));

  it('refreshSymbols should call the SymbolList.refreshSymbols method', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<watch-list></watch-list>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Call the Function
    element.isolateScope().refreshSymbols();
    // Tests
    expect(SymbolList.refreshSymbols).toHaveBeenCalled();
  });

  it('chooseSymbol should call the SymbolList.refreshSymbols method', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<watch-list></watch-list>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Call the Function
    testData.User.WatchList.splice(0, 1);
    spyOn(element.isolateScope(), 'selectSymbol');

    element.isolateScope().watchList = testData.User.WatchList;
    var test = new Symbol(testData.Symbols[0]);

    element.isolateScope().chooseSymbol(test);

    //SymbolList
    //$scope.selectSymbol
    //$scope.watchList
    // Tests
    expect(element.isolateScope().selectSymbol).toHaveBeenCalled();
  });

  it('selectSymbol should call the SymbolList.refreshSymbols method', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<watch-list></watch-list>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Call the Function
    element.isolateScope().watchList = testData.User.WatchList;
    element.isolateScope().preferences = testData.User.Preferences;
    var test = new Symbol(testData.Symbols[1]);
    // Create a spy
    spyOn(test, 'getHistoricalData');
    element.isolateScope().selectSymbol(test);

    //$scope.selectedSymbol = symbol;
    //$scope.selectedTab
    // Tests
    expect(test.getHistoricalData).toHaveBeenCalled();
  });

});
