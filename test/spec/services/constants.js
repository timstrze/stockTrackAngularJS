'use strict';

describe('Service: Constants', function () {

  // load the service's module
  beforeEach(module('stockTrackAngularJsApp'));

  // instantiate service
  var Constants;

  beforeEach(inject(function (_Constants_) {
    Constants = _Constants_;

    Constants.fiveDaysFromtoday = new Date('Wed Aug 26 2015 12:18:00 GMT-0500 (CDT)');
    Constants.oneMonthFromtoday = new Date('Fri Jul 31 2015 12:18:00 GMT-0500 (CDT)');
    Constants.oneYearFromtoday = new Date('Sun Aug 31 2014 12:18:00 GMT-0500 (CDT)');
    Constants.sixMonthsFromtoday = new Date('Tue Mar 03 2015 12:18:00 GMT-0600 (CST)');
    Constants.threeMonthsFromtoday = new Date('Sun May 31 2015 12:18:00 GMT-0500 (CDT)');
    Constants.today = new Date('Mon Aug 31 2015 12:10:38 GMT-0500 (CDT)');

  }));


  describe('Constants.getDate', function () {

    it('should take in a javascript date and returns it formatted as YYYY-MM-DD', function () {
      var day = new Date('Mon Aug 31 2015 12:10:38 GMT-0500 (CDT)');
      expect(Constants.getDate(day)).toBe('2015-08-31');
    });
  });

  describe('Constants.historicalDateRange', function () {

    it('should set an Array of default historical data for the tabs', function () {
      expect(angular.equals(Constants.historicalTabs(), [
        { title: '5 Day', slug: '5-day', endDate: '2015-08-31', startDate: '2015-08-26' },
        { title: '1 Month', slug: '1-month', endDate: '2015-08-31', startDate: '2015-07-31' },
        { title: '3 Month', slug: '3-month', endDate: '2015-08-31', startDate: '2015-05-31' },
        { title: '6 Month', slug: '6-month', endDate: '2015-08-31', startDate: '2015-03-03' },
        { title: '1 Year', slug: '1-year', endDate: '2015-08-31', startDate: '2014-08-31' }
      ])).toBe(true);
    });
  });

});
