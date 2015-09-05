'use strict';

describe('Directive: buy-button', function() {
  var $compile, $rootScope, $mdDialog, $window, testData;

  // Load the myApp module, which contains the directive
  beforeEach(module('stockTrackAngularJsApp'));

  // Store references to $rootScope and $compile
  beforeEach(inject(function($templateCache, _$compile_, _$rootScope_, _$mdDialog_, _$window_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $window = _$window_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $mdDialog = _$mdDialog_;

    testData = angular.copy(window.testData);

    spyOn($mdDialog, 'show');
    spyOn($mdDialog, 'cancel');
    spyOn($window, 'alert');
  }));

  it('should contain the class name of buy-button and contain functions', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<buy-button></buy-button>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.isolateScope().openBuyModal).toEqual(jasmine.any(Function));
    expect(element.isolateScope().buy).toEqual(jasmine.any(Function));
    expect(element.html()).toContain('class="buy-button"');
  });

  it('openBuyModal should open an mdDialog modal', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<buy-button></buy-button>')($rootScope);

    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();

    element.isolateScope().openBuyModal();
    expect($mdDialog.show).toHaveBeenCalled();
  });

  it('buy should buy the selected symbol and add to the Positions list', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<buy-button></buy-button>')($rootScope);

    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();

    var originalPosition = angular.copy(testData.Positions);

    element.isolateScope().user = testData.User;
    element.isolateScope().user.Positions = testData.Positions;
    element.isolateScope().symbol = testData.Symbols[0];

    element.isolateScope().buy(5);
    expect(element.isolateScope().user.availableCash).toBe(14412.5);
    expect(element.isolateScope().user.Positions.length).toBe(originalPosition.length + 1);
    expect($mdDialog.cancel).toHaveBeenCalled();
  });

  it('buy should buy the selected symbol and add to the Position buys list', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<buy-button></buy-button>')($rootScope);

    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();

    var originalPositions = angular.copy(testData.Positions);

    element.isolateScope().user = testData.User;
    element.isolateScope().user.Positions = testData.Positions;
    element.isolateScope().symbol = testData.Symbols[1];

    element.isolateScope().buy(5);
    expect(element.isolateScope().user.availableCash).toBe(14594.25);
    expect(element.isolateScope().user.Positions.length).toBe(originalPositions.length);
    expect(element.isolateScope().user.Positions[0].buys.length).toBe(originalPositions[0].buys.length + 1);
    expect($mdDialog.cancel).toHaveBeenCalled();
  });

  it('buy should alert the user if they do not have enough cash', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<buy-button></buy-button>')($rootScope);

    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();

    element.isolateScope().user = testData.User;
    element.isolateScope().user.Positions = testData.Positions;
    element.isolateScope().symbol = testData.Symbols[0];

    element.isolateScope().buy(500);
    expect($window.alert).toHaveBeenCalled();
  });

});
