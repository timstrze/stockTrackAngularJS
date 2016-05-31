'use strict';

/**
 * @ngdoc filter
 * @name stockTrackAngularJsApp.filter:sortOrders
 * @function
 * @description
 * # sortSymbols
 * Filter in the stockTrackAngularJsApp.
 */
angular.module('stockTrackAngularJsApp')
  .filter('sortOrders', function () {
    return function (items, filterBy) {
      if (!items) {
        return;
      }
      else if (filterBy === 'aToZ') {
        return items.sort(function (a, b) {
          var nameA = a.symbol.toLowerCase(), nameB = b.symbol.toLowerCase();
          if (nameA < nameB) //sort string ascending
            return -1;
          if (nameA > nameB)
            return 1;
          return 0
        });
      }
    };
  });

