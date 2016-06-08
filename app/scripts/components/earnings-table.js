'use strict';

/**
 * @ngdoc component
 * @name stockTrackAngularJsApp.component:earnings-table
 * @element earnings-table
 * @restrict E
 *
 * @description
 * # watchList
 * component for displaying the User WatchList
 *
 * @param {Object} user User Object
 */
angular.module('stockTrackAngularJsApp')
  .component('earningsTable', {
      templateUrl: 'views/components/earnings-table.html',
      restrict: 'E',
      bindings: {
        symbol: '<',
        positions: '<'
      },
      controller: function ($scope, $filter) {

        var _this = this;

        this.filterType = 'created';
        this.filterReverse = false;


        /**
         * @ngdoc function
         * @name filterPositions
         * @methodOf stockTrackAngularJsApp.component:earnings-table
         *
         * @description
         * Performs the search for the Symbol Type-Ahead.
         *
         * @param {String} filterType Search string
         *
         */
        this.filterPositions = function (filterType) {

          this.filterType = filterType;
          this.filterReverse = !this.filterReverse;

          this.positions.buys = $filter('orderBy')(this.positions.buys, this.filterType, this.filterReverse);
        };





        /**
         * @ngdoc function
         * @name $watch
         * @eventyOf stockTrackAngularJsApp.component:watch-list-details
         *
         * @description
         * Watches the selectedSymbol and updates the buy filter.
         *
         */
        $scope.$watch('$ctrl.symbol', function () {
          // Make sure there is historical data
          if (_this.symbol && _this.positions && _this.positions.buys) {
            _this.positions.buys = $filter('orderBy')(_this.positions.buys, _this.filterType, _this.filterReverse);
          }
        }, true);

      }
  });
