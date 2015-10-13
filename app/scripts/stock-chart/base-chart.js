'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:base-chart
 * @element base-chart
 * @restrict E
 *
 * @description
 * # baseChart
 * Directive to create a line chart based off a Symbol's historical data.
 *
 * @param {Array} historicalData An array of historical data
 */

/*global d3 */

angular.module('stockTrackAngularJsApp')
  .directive('baseChart', function ($window, LineChart) {
    return {
      scope: {
        symbol: '=',
        selectedChart: '=',
        positions: '='
      },
      template: '<div class="base-chart"></div>',
      link: function postLink($scope, element, attrs) {

        $scope.svg = d3.select(element[0]
          .querySelector('.base-chart'))
          .append('svg');

        $scope.svgContent = $scope.svg.append("g");

        $scope.area = $scope.svgContent.append("path");
        $scope.chartLine = $scope.svgContent.append('path');
        $scope.chartPositions = $scope.svgContent.append('path');

        $scope.xAxis = $scope.svgContent.append('g');
        $scope.yAxis = $scope.svgContent.append('g');

        $scope.yAxis
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text('Price ($)');

        /**
         * @ngdoc function
         * @name parseDate
         * @methodOf stockTrackAngularJsApp.directive:line-chart
         *
         * @description
         * Parses a date that is friendly to d3
         *
         */
        $scope.parseDate = d3.time.format('%Y-%m-%d').parse;
        /**
         * @ngdoc function
         * @name $watch
         * @eventOf stockTrackAngularJsApp.directive:base-chart
         *
         * @description
         * Watches the Symbol historicalData Array and calls the render Function.
         *
         */
        $scope.$watch('symbol.historicalData', function () {
          // Make sure there is historical data
          if ($scope.symbol && $scope.symbol.historicalData && $scope.symbol.historicalData.length > 0) {
            LineChart.render($scope, element, $scope.symbol.historicalData);
          }
        }, true);



        /**
         * @ngdoc function
         * @name $on
         * @eventOf stockTrackAngularJsApp.directive:base-chart
         *
         * @description
         * Watches the window and renders the line chart
         *
         */
        angular.element($window).on('resize', function () {
          // Make sure there is historical data
          if ($scope.symbol && $scope.symbol.historicalData && $scope.symbol.historicalData.length > 0) {
            //$scope.render($scope.symbol.historicalData);
          }
        });
      }
    };
  });
