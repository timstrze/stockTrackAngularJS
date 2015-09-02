describe('Directive: buy-button', function() {
  var $compile, $rootScope;

  // Load the myApp module, which contains the directive
  beforeEach(module('stockTrackAngularJsApp'));

  //// Store references to $rootScope and $compile
  //beforeEach(inject(function($templateCache, _$compile_, _$rootScope_){
  //  // The injector unwraps the underscores (_) from around the parameter names when matching
  //  $compile = _$compile_;
  //  $rootScope = _$rootScope_;
  //}));
  //
  //it('should contain the class name of buy-button', function() {
  //  // Compile a piece of HTML containing the directive
  //  var element = $compile("<buy-button></buy-button>")($rootScope);
  //  // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
  //  $rootScope.$digest();
  //  // Check that the compiled element contains the templated content
  //
  //  console.log(element.scope().testMe, $rootScope.testMe)
  //  expect(element.html()).toContain('class="buy-button"');
  //});

  //
  //var $scope;
  //
  //beforeEach(inject(function($rootScope, $compile) {
  //   $scope = $rootScope.$new();
  //   var element = angular.element("<test></test>");
  //   template = $compile(element)($scope);
  //   $scope.$digest();
  //   controller = element.controller;
  //}));


});
