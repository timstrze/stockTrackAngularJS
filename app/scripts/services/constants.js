'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.service:Constants
 * @description
 * # Constants
 * Contains various properties and methods for the app.
 *
 */
angular.module('stockTrackAngularJsApp')
  .factory('Constants', function () {

    var Constants = {};


    /**
     * @ngdoc function
     * @name Constants.getDate
     * @methodOf stockTrackAngularJsApp.service:Constants
     *
     * @description
     * Takes in a javascript date and returns it formatted as 'YYYY-MM-DD'
     *
     * @param {String} day Example string: Mon Aug 31 2015 12:10:38 GMT-0500 (CDT)
     *
     * @returns {String} date formatted as 'YYYY-MM-DD' Example: 2015-08-31
     */
    Constants.getDate = function (day) {
      // Get the day as an integer: 31
      var dd = day.getDate();
      // Get the month as mm: January is 0
      var mm = day.getMonth() + 1;
      // Get year as yyyy: 2015
      var yyyy = day.getFullYear();
      // Make the day a two digit integer if not
      if (dd < 10) {
        dd = '0' + dd;
      }
      // Make the month a two digit integer if not
      if (mm < 10) {
        mm = '0' + mm;
      }
      // Return the date as 2015-08-31
      return yyyy + '-' + mm + '-' + dd;
    };


    /**
     * @ngdoc function
     * @name Constants.fiveDaysFromtoday
     * @propertyOf stockTrackAngularJsApp.service:Constants
     *
     * @description
     * Returns a string formatted as Wed Aug 26 2015 12:18:00 GMT-0500 (CDT)
     *
     * @returns {String} date formatted as Wed Aug 26 2015 12:18:00 GMT-0500 (CDT)
     *
     */
    Constants.fiveDaysFromtoday = new Date(new Date().setDate(new Date().getDate() - 5));



    /**
     * @ngdoc function
     * @name Constants.oneMonthFromtoday
     * @propertyOf stockTrackAngularJsApp.service:Constants
     *
     * @description
     * Returns a string formatted as Fri Jul 31 2015 12:18:00 GMT-0500 (CDT)
     *
     * @returns {String} date formatted as Fri Jul 31 2015 12:18:00 GMT-0500 (CDT)
     *
     */
    Constants.oneMonthFromtoday = new Date(new Date().setMonth(new Date().getMonth() - 1));


    /**
     * @ngdoc function
     * @name Constants.oneYearFromtoday
     * @propertyOf stockTrackAngularJsApp.service:Constants
     *
     * @description
     * Returns a string formatted as Sun Aug 31 2014 12:18:00 GMT-0500 (CDT)
     *
     * @returns {String} date formatted as Sun Aug 31 2014 12:18:00 GMT-0500 (CDT)
     *
     */
    Constants.oneYearFromtoday = new Date(new Date().setFullYear(new Date().getFullYear() - 1));


    /**
     * @ngdoc function
     * @name Constants.sixMonthsFromtoday
     * @propertyOf stockTrackAngularJsApp.service:Constants
     *
     * @description
     * Returns a string formatted as Tue Mar 03 2015 12:18:00 GMT-0600 (CST)
     *
     * @returns {String} date formatted as Tue Mar 03 2015 12:18:00 GMT-0600 (CST)
     *
     */
    Constants.sixMonthsFromtoday = new Date(new Date().setMonth(new Date().getMonth() - 6));


    /**
     * @ngdoc function
     * @name Constants.threeMonthsFromtoday
     * @propertyOf stockTrackAngularJsApp.service:Constants
     *
     * @description
     * Returns a string formatted as Sun May 31 2015 12:18:00 GMT-0500 (CDT)
     *
     * @returns {String} date formatted as Sun May 31 2015 12:18:00 GMT-0500 (CDT)
     *
     */
    Constants.threeMonthsFromtoday = new Date(new Date().setMonth(new Date().getMonth() - 3));


    /**
     * @ngdoc function
     * @name Constants.today
     * @propertyOf stockTrackAngularJsApp.service:Constants
     *
     * @description
     * Returns a string formatted as Mon Aug 31 2015 12:18:00 GMT-0500 (CDT)
     *
     * @returns {String} date formatted as Wed Mon Aug 31 2015 12:18:00 GMT-0500 (CDT)
     *
     */
    Constants.today = new Date();


    /**
     * @ngdoc function
     * @name Constants.historicalTabs
     * @propertyOf stockTrackAngularJsApp.service:Constants
     *
     * @description
     * Array of default historical data for tabs
     *
     * @returns {Array} Returns and
     *
     */
    Constants.historicalTabs = function() {
      return [
        {
          title: '5 Day',
          slug: '5-day',
          endDate: Constants.getDate(Constants.today),
          startDate: Constants.getDate(Constants.fiveDaysFromtoday)
        },
        {
          title: '1 Month',
          slug: '1-month',
          endDate: Constants.getDate(Constants.today),
          startDate: Constants.getDate(Constants.oneMonthFromtoday)
        },
        {
          title: '3 Month',
          slug: '3-month',
          endDate: Constants.getDate(Constants.today),
          startDate: Constants.getDate(Constants.threeMonthsFromtoday)
        },
        {
          title: '6 Month',
          slug: '6-month',
          endDate: Constants.getDate(Constants.today),
          startDate: Constants.getDate(Constants.sixMonthsFromtoday)
        },
        {
          title: '1 Year',
          slug: '1-year',
          endDate: Constants.getDate(Constants.today),
          startDate: Constants.getDate(Constants.oneYearFromtoday)
        }
      ];
    };


    return Constants;

  });
