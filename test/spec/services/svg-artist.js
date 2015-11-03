'use strict';

describe('Service: SvgArtist', function () {

  // load the service's module
  beforeEach(module('stockTrackAngularJsApp'));

  // instantiate service
  var SvgArtist;
  var testData = angular.copy(window.testData);

  beforeEach(inject(function (_SvgArtist_) {
    SvgArtist = _SvgArtist_;
  }));

  describe('SvgArtist.http', function () {

    it('SvgArtist should exist', function () {
      expect(SvgArtist.http).not.toBeUndefined();
    });

  });

});
