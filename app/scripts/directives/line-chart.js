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
        symbol: '=',
        positions: '='
      },
      restrict: 'E',
      template: '<div class="line-chart"></div>',
      link: function postLink($scope, element) {
        $scope.svg = d3.select(element[0]
          .querySelector('.line-chart'))
          .append('svg');

        $scope.area = $scope.svg.append("path");
        $scope.chartLine = $scope.svg.append('path');
        $scope.chartPositions = $scope.svg.append('path');

        $scope.xAxis = $scope.svg.append('g');
        $scope.yAxis = $scope.svg.append('g');

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
        $scope.render = function (historicalData) {

          var positions;

          // Loop over the Positions
          angular.forEach($scope.positions, function (position) {
            // Check to see if Symbols match
            if (position.Symbol.Symbol.toLowerCase() === $scope.symbol.Symbol.toLowerCase()) {
              positions = position;
            }
          });

          // Format the historical data for d3
          historicalData.forEach(function (d) {
            d.date = $scope.parseDate(d.Date);
            d.close = +d.Close;
          });

          // Add extra margin
          var margin = {top: 20, right: 20, bottom: 30, left: 30};
          // Get the width of the parent element
          var width = element.parent()[0].offsetWidth;
          // Get the height of the parent element
          var height = element.parent()[0].offsetHeight;

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

          var area = d3.svg.area()
            .x(function(d) { return x(d.date); })
            .y0(height)
            .y1(function(d) { return y(d.close); });


          $scope.svg
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


          x.domain(d3.extent(historicalData, function (d) {
            return d.date;
          }));
          y.domain(d3.extent(historicalData, function (d) {
            return d.close;
          }));

          //var xScale = d3.scale.linear()
          //  .domain([0, d3.max(historicalData, function(d) { return d.date; })])
          //  .range([0, width]);
          //
          //$scope.xAxis
          //  .call(d3.svg.axis()
          //    .scale(xScale)
          //    .orient("bottom"));

          //var yScale = d3.scale.linear()
          //  .domain([0, d3.max(historicalData, function(d) { return d.close; })])
          //  .range([0, height]);
          //
          //$scope.yAxis = d3.svg.axis()
          //  .attr('class', 'y axis')
          //  .call(yAxis)
          //  .append('text')

          //$scope.xAxis
          //  .attr('class', 'x axis')
          //  .attr('transform', 'translate(0,' + height + ')')
          //  .call(xAxis);
          //
          //$scope.yAxis
          //  .attr('class', 'y axis')
          //  .call(yAxis)
          //  .attr('transform', 'translate(30, 0)')
          //  .append('text')
          //  .attr('transform', 'rotate(-90)')
          //  .attr('y', 6)
          //  .attr('dy', '.71em')
          //  .style('text-anchor', 'end')
          //  .text('Price ($)');

          $scope.area
            .datum(historicalData)
            .transition()
            .duration(500)
            .ease("linear")
            .attr("class", "area")
            .attr("d", area);

          $scope.chartLine
            .datum(historicalData)
            .transition()
            .duration(500)
            .ease("linear")
            .attr('class', 'line')
            .attr('d', line);



          if(positions) {

            $scope.svg.selectAll("circle").remove();
            $scope.svg.selectAll("circle")
              .data(positions.buys)
              .enter()
              .append("circle")
              .attr("cx", function(d, i) {
                return x($scope.parseDate(d.created.split(' ')[0]));
              })
              .attr("cy", function (d) {
                return y(d.ask);
              })

              .attr("r", function(d) {
                return 40;
              })
              .attr("fill", "yellow")
              .attr("stroke", "orange");

            $scope.svg.selectAll("text").remove();
            $scope.svg.selectAll("text")
              .data(positions.buys)
              .enter()
              .append("text")
              .attr("x", function(d, i) {
                return x($scope.parseDate(d.created.split(' ')[0]));
              })
              .attr("y", function (d) {
                return y(d.ask);
              })
              .text(function(d) {
                return d.ask;
              });

          }else{
            $scope.svg.selectAll("text").remove();
            $scope.svg.selectAll("circle").remove()
          }


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
        $scope.$watch('symbol.historicalData', function () {
          // Make sure there is historical data
          if ($scope.symbol && $scope.symbol.historicalData && $scope.symbol.historicalData.length > 0) {
            $scope.render($scope.symbol.historicalData);
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
          if ($scope.symbol && $scope.symbol.historicalData && $scope.symbol.historicalData.length > 0) {
            $scope.render($scope.symbol.historicalData);
          }
        });

      }
    };
  });
