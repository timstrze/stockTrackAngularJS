'use strict';

/**
 * @ngdoc filter
 * @name stockTrackAngularJsApp.filter:sortPositions
 * @function
 * @description
 * # sortPositions
 * Filter in the stockTrackAngularJsApp.
 */
angular.module('stockTrackAngularJsApp')
  .filter('sortPositions', function () {
    return function (items, filterBy) {
      if (!items) {
        return;
      }
      else if (filterBy === 'sortDailyPNLAsc') {
        return items;

        //sortDailyPNLDesc

        //   .sort(function (a, b) {
        //   var nameA = a.symbol.toLowerCase(), nameB = b.symbol.toLowerCase();
        //   if (nameA < nameB) //sort string ascending
        //     return -1;
        //   if (nameA > nameB)
        //     return 1;
        //   return 0
        // });
      }
    };
  });
