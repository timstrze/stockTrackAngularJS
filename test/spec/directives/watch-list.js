'use strict';

describe('Directive: watch-list', function() {
  var $compile, $rootScope, SymbolList, Symbol, SSymbol, $window, testData;

  var spyWatch = jasmine.createSpy();

  // Load the myApp module, which contains the directive
  beforeEach(module('stockTrackAngularJsApp'));

  beforeEach(module(function ($provide) {
    $provide.value('$mdSidenav', function () {
      return {
        close: spyWatch
      };
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
    SSymbol = _Symbol_;
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
    expect(element.isolateScope().removeFromWatchlist).toEqual(jasmine.any(Function));
    //expect(element.isolateScope().closeWatchlist).toEqual(jasmine.any(Function));
    expect(element.isolateScope().search).toEqual(jasmine.any(Function));
    expect(element.isolateScope().refreshSymbols).toEqual(jasmine.any(Function));
    expect(element.isolateScope().chooseSymbol).toEqual(jasmine.any(Function));
    expect(element.isolateScope().selectSymbol).toEqual(jasmine.any(Function));
    expect(element.html()).toContain('class="watch-list"');
  });


  it('removeFromWatchlist should confirm if the user wants to remove a Symbol from the watchlist', inject(function($q) {
    // Create a spy for the confirm
    spyOn($mdDialog, 'show').and.returnValue({
      // Return a successful promise
      $promise: $q.when({})
    });
    // Compile a piece of HTML containing the directive
    var element = $compile('<watch-list-details></watch-list-details>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Set the default scope data
    element.isolateScope().user = testData.User;
    element.isolateScope().user.WatchList = testData.Symbols;
    // Make a copy of the User WatchList
    var wlCopy = angular.copy(element.isolateScope().user.WatchList);
    // Call the Function
    element.isolateScope().removeFromWatchlist(testData.Symbols[0], {});
    $rootScope.$apply();
    // Tests
    expect(SymbolList.removeSymbol).toHaveBeenCalled();
    expect(element.isolateScope().user.WatchList.length).toBe(wlCopy.length - 1);
    expect(element.isolateScope().user.selectedSymbol).not.toBeUndefined();
  }));

  //it('closeWatchlist should log the action', function() {
  //  // Compile a piece of HTML containing the directive
  //  var element = $compile('<watch-list></watch-list>')($rootScope);
  //  // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
  //  $rootScope.$digest();
  //  // Run the function
  //  element.isolateScope().closeWatchlist();
  //  // Tests
  //  expect(spyWatch).toHaveBeenCalled();
  //});

  it('search should call the SymbolList.refreshSymbols method if search string is greater than 0', inject(function($q) {
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

  it('search should not call the SymbolList.refreshSymbols method if search string is less than 0', function() {
    // Create a spy
    spyOn(Symbol.http, 'search');
    // Compile a piece of HTML containing the directive
    var element = $compile('<watch-list></watch-list>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Call the Function
    element.isolateScope().search('');
    // Make sure Promises go out
    $rootScope.$apply();
    // Tests
    expect(Symbol.http.search).not.toHaveBeenCalled();
  });

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

  it('chooseSymbol should reset the type-ahead text box and add new symbol to the symbol list and call selectSymbol', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<watch-list></watch-list>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Remove the first item from the watchlist
    testData.User.WatchList.splice(0, 1);
    // Create spy
    spyOn(element.isolateScope(), 'selectSymbol');
    // Set the Watchlist data
    element.isolateScope().watchList = testData.User.WatchList;
    // Make sure that AAPL is not first in the list since we are testing with it
    expect(element.isolateScope().watchList[0].Symbol).not.toBe('AAPL');
    // Make a copy of the Symbol List to compare later
    var copySymbolList = angular.copy(SymbolList);
    // Create a new Symbol
    var newSymbol = new SSymbol(testData.Symbols[0]);
    // Call the Function
    element.isolateScope().chooseSymbol(newSymbol);
    // Tests
    expect(element.isolateScope().searchText).toBe('');
    expect(newSymbol.Symbol).toBe('AAPL');
    expect(SymbolList.Symbols.length).toBe(copySymbolList.Symbols.length + 1);
    expect(element.isolateScope().selectSymbol).toHaveBeenCalled();
  });

  it('selectSymbol should set the selected Symbol and get the historical graph data for the selected Symbol', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<watch-list></watch-list>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Set the default variables for scope
    element.isolateScope().watchList = testData.User.WatchList;
    element.isolateScope().preferences = testData.User.Preferences;
    // Create a new Symbol
    var newSymbol = new SSymbol(testData.Symbols[1]);
    // Create a spy
    spyOn(newSymbol, 'getHistoricalData');
    // Call the Function
    element.isolateScope().selectSymbol(newSymbol);
    // Tests
    expect(angular.equals(element.isolateScope().selectedSymbol, newSymbol)).toBe(true);
    // Make sure the default tab is being selected
    expect(element.isolateScope().selectedTab.slug).toBe('3-month');
    expect(element.isolateScope().selectedTab.title).toBe('3 Month');
    expect(newSymbol.getHistoricalData).toHaveBeenCalled();
  });

});
