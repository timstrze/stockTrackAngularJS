'use strict';

/**
 * @ngdoc filter
 * @name stockTrackAngularJsApp.filter:orderWatchList
 * @function
 * @description
 * # orderWatchList
 * Filter in the stockTrackAngularJsApp.
 */
angular.module('stockTrackAngularJsApp')
  .filter('orderWatchList', function () {
    return function (items, filterBy) {
      if(!items) {
        return;
      }
      else if(filterBy === 'aToZ') {
        return items.sort(function (a, b) {
          var nameA=a.symbol.toLowerCase(), nameB=b.symbol.toLowerCase();
          if (nameA < nameB) //sort string ascending
            return -1;
          if (nameA > nameB)
            return 1;
          return 0
        });
      }
      else if(filterBy === 'zToA') {
        return items.sort(function (a, b) {
          var nameA=a.symbol.toLowerCase(), nameB=b.symbol.toLowerCase();
          if (nameA > nameB) //sort string descending
            return -1;
          if (nameA < nameB)
            return 1;
          return 0
        });
      }

    };
  });

