'use strict';

/**
 * @ngdoc component
 * @name stockTrackAngularJsApp.component:watch-list-details
 * @element watch-list-details
 * @restrict E
x *
 * @description
 * Display the selected Symbol's details and graphs.
 *
 * @param {Object} symbol Symbol Object
 * @param {Object} user User Object
 *
 */
angular.module('stockTrackAngularJsApp')
  .component('watchListDetails', {
      restrict: 'E',
      bindings: {
        // extras: '<',
        symbol: '<',
        user: '<'
      },
      templateUrl: 'views/components/watch-list-details.html',

      controller: function ($mdDialog, $window, SymbolList, Constants, SvgArtist, $filter, $scope) {
        var _this = this;

        this.Constants = Constants;

        this.filterReverse = false;
        this.filterType = 'created';

        this.settings = {
          showLine: true,
          showText: true,
          showSave: true
        };
        
        this.svgChartArtist = {};
        this.svgChartArtist = new SvgArtist({target: '.svg-chart'});

        this.selectedChart = Constants.chartTypes[0].slug;

        /**
         * @ngdoc property
         * @name historicalDateRange
         * @propertyOf stockTrackAngularJsApp.component:watch-list-details
         *
         * @description
         * Make service method available to the ng-repeat.
         */
        this.historicalDateRange = Constants.historicalDateRange();


        this.selectedHistoricalDateRange = this.historicalDateRange[2].slug;



        /**
         * @ngdoc function
         * @name opensNewsWindow
         * @propertyOf stockTrackAngularJsApp.component:watch-list-details
         *
         * @description
         * Make service method available to the ng-repeat.
         */
        this.openNewsWindow = function(url) {
          $window.open(url, '_blank')
        };




        /**
         * @ngdoc function
         * @name $watch
         * @eventyOf stockTrackAngularJsApp.component:watch-list-details
         *
         * @description
         * Watches the Symbol historicalData Array and calls the render Function.
         *
         */
        $scope.$watch('$ctrl.symbol', function () {
          // Make sure there is historical data
          if (_this.symbol && _this.user && _this.user.selectedAccount && _this.user.selectedAccount.Positions && _this.user.selectedAccount.Positions.length) {
            _this.positions = {};

            // Loop over the Positions
            angular.forEach(_this.user.selectedAccount.Positions, function (position) {
              // Check to see if Symbols match
              if (position.Symbol.Symbol.toLowerCase() === _this.symbol.Symbol.toLowerCase()) {
                _this.positions = position;
              }
            });
          }else{
            _this.positions = {};
          }
        }, true);

      }
  });
