'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.Constants
 * @description
 * # Constants
 * Factory in the stockTrackAngularJsApp.
 */
angular.module('stockTrackAngularJsApp')
  .factory('Constants', function () {

    var getDate = function (day) {
      var dd = day.getDate();
      //January is 0
      var mm = day.getMonth() + 1;

      var yyyy = day.getFullYear();

      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }

      return yyyy + '-' + mm + '-' + dd;
    };

    return {

      historicalTabs: [
        {
          title: '5 Day',
          endDate: getDate(new Date()),
          startDate: getDate(new Date(new Date().setDate(new Date().getDate() - 5)))
        },
        {
          title: '1 Month',
          endDate: getDate(new Date()),
          startDate: getDate(new Date(new Date().setMonth(new Date().getMonth() - 1)))
        },
        {
          title: '3 Month',
          endDate: getDate(new Date()),
          startDate: getDate(new Date(new Date().setMonth(new Date().getMonth() - 3)))
        },
        {
          title: '6 Month',
          endDate: getDate(new Date()),
          startDate: getDate(new Date(new Date().setMonth(new Date().getMonth() - 6)))
        },
        {
          title: '1 Year',
          endDate: getDate(new Date()),
          startDate: getDate(new Date(new Date().setFullYear(new Date().getFullYear() - 1)))
        }
      ]
    };
  });
