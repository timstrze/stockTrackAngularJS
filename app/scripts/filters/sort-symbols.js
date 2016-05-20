'use strict';

/**
 * @ngdoc filter
 * @name stockTrackAngularJsApp.filter:sortSymbols
 * @function
 * @description
 * # sortSymbols
 * Filter in the stockTrackAngularJsApp.
 */
angular.module('stockTrackAngularJsApp')
  .filter('sortSymbols', function () {
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
      else if (filterBy === 'zToA') {
        return items.sort(function (a, b) {
          var nameA = a.symbol.toLowerCase(), nameB = b.symbol.toLowerCase();
          if (nameA > nameB) //sort string descending
            return -1;
          if (nameA < nameB)
            return 1;
          return 0
        });
      }
      else if (filterBy === 'sortChangeDesc') {
        return items.sort(function (a, b) {
          return parseFloat(a.Symbol.ChangeinPercent) - parseFloat(b.Symbol.ChangeinPercent);
        });
      }
      else if (filterBy === 'sortChangeAsc') {
        return items.sort(function (a, b) {
          return parseFloat(b.Symbol.ChangeinPercent) - parseFloat(a.Symbol.ChangeinPercent);
        });
      }
      else if (filterBy === 'sortDailyPNLDesc') {
        return items.sort(function (a, b) {
          return parseFloat(a.dailyPNL) - parseFloat(b.dailyPNL);
        });
      }
      else if (filterBy === 'sortDailyPNLAsc') {
        return items.sort(function (a, b) {
          return parseFloat(b.dailyPNL) - parseFloat(a.dailyPNL);
        });
      }
      else if (filterBy === 'sortTotalPNLDesc') {
        return items.sort(function (a, b) {
          return parseFloat(a.totalPNL) - parseFloat(b.totalPNL);
        });
      }
      else if (filterBy === 'sortTotalPNLAsc') {
        return items.sort(function (a, b) {
          return parseFloat(b.totalPNL) - parseFloat(a.totalPNL);
        });
      }
      else if (filterBy === 'sortTotalQuantityDesc') {
        return items.sort(function (a, b) {
          return parseFloat(a.totalQuantity) - parseFloat(b.totalQuantity);
        });
      }
      else if (filterBy === 'sortTotalQuantityAsc') {
        return items.sort(function (a, b) {
          return parseFloat(b.totalQuantity) - parseFloat(a.totalQuantity);
        });
      }
      else if (filterBy === 'sortTotalValueDesc') {
        return items.sort(function (a, b) {
          return parseFloat(a.totalValue) - parseFloat(b.totalValue);
        });
      }
      else if (filterBy === 'sortTotalValueAsc') {
        return items.sort(function (a, b) {
          return parseFloat(b.totalValue) - parseFloat(a.totalValue);
        });
      }
    };
  });

