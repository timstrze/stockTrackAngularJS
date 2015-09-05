'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:line-chart
 * @element line-chart
 * @restrict E
 *
 * @description
 * # lineChart
 * Directive to create a line chart based off a Symbol's historical data.
 *
 * @param {Array} historicalData An array of historical data
 */

/*global d3 */

angular.module('stockTrackAngularJsApp')
  .directive('lineChart', function ($window) {
    return {
      scope: {
        historicalData: '='
      },
      restrict: 'E',
      link: function postLink($scope, element) {


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
         * @name render
         * @methodOf stockTrackAngularJsApp.directive:line-chart
         *
         * @description
         * Creates the line chart
         *
         */
        $scope.render = function () {
          // Add extra margin
          var margin = {top: 20, right: 20, bottom: 30, left: 50};
          // Get the width of the parent element
          var width = element.parent()[0].offsetWidth - margin.left - margin.right;
          // Get the height of the parent element
          var height = element.parent()[0].offsetHeight - margin.top - margin.bottom;

          var x = d3.time.scale()
            .range([0, width]);

          var y = d3.scale.linear()
            .range([height, 0]);

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

          var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

          var line = d3.svg.line()
            .x(function (d) {
              return x(d.date);
            })
            .y(function (d) {
              return y(d.close);
            });
          // Remove the previous graph
          // TODO: don't remove element
          d3.select(element[0]).selectAll('*').remove();

          var svg = d3.select(element[0]).append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
          // Format the historical data for d3
          $scope.historicalData.forEach(function (d) {
            d.date = $scope.parseDate(d.Date);
            d.close = +d.Close;
          });

          x.domain(d3.extent($scope.historicalData, function (d) {
            return d.date;
          }));
          y.domain(d3.extent($scope.historicalData, function (d) {
            return d.close;
          }));

          svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

          svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Price ($)');

          svg.append('path')
            .datum($scope.historicalData)
            .attr('class', 'line')
            .attr('d', line);

        };



        /**
         * @ngdoc function
         * @name $watch
         * @eventOf stockTrackAngularJsApp.directive:line-chart
         *
         * @description
         * Watches the Symbol historicalData Array and calls the render Function.
         *
         */
        $scope.$watch('historicalData', function () {
          // Make sure there is historical data
          if ($scope.historicalData && $scope.historicalData.length > 0) {
            $scope.render();
          }
        }, true);



        /**
         * @ngdoc function
         * @name $on
         * @eventOf stockTrackAngularJsApp.directive:line-chart
         *
         * @description
         * Watches the window and renders the line chart
         *
         */
        angular.element($window).on('resize', function () {
          // Make sure there is historical data
          if ($scope.historicalData && $scope.historicalData.length > 0) {
            $scope.render();
          }
        });

      }
    };
  });
