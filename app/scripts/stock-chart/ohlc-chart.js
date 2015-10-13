'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:ohlc-chart
 * @element ohlc-chart
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
  .directive('lineChart', function ($window, $mdMedia) {
    return {
      require: '^base-chart',
      template: '<div class="ohlc-chart"></div>',
      link: function postLink($scope, element) {
        $scope.svg = d3.select(element[0]
          .querySelector('.ohlc-chart'))
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
         * @methodOf stockTrackAngularJsApp.directive:ohlc-chart
         *
         * @description
         * Parses a date that is friendly to d3
         *
         */
        $scope.parseDate = d3.time.format('%Y-%m-%d').parse;



        /**
         * @ngdoc function
         * @name render
         * @methodOf stockTrackAngularJsApp.directive:ohlc-chart
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
          var margin = {top: 20, right: 10, bottom: 30, left: 40};
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
            .orient("bottom");

          // Only toggle the modal if small size
          if($mdMedia('sm') || $mdMedia('md')) {
            xAxis.ticks(5);
          }

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
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

          $scope.svgContent
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


          x.domain(d3.extent(historicalData, function (d) {
            return d.date;
          }));
          y.domain(d3.extent(historicalData, function (d) {
            return d.close;
          }));

          $scope.xAxis
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + (height) + ')')
            .call(xAxis);

          $scope.yAxis
            .attr('class', 'y axis')
            .call(yAxis);

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

            //var g = $scope.svg.append("g");
            //
            //var img = g.append("svg:image")
            //  .attr("xlink:href", "./images/icons/buy.svg")
            //  .attr("width", 50)
            //  .attr("height", 50)
            //  .attr("x", 228)
            //  .attr("y",53);


            $scope.svgContent.selectAll("circle").remove();
            $scope.svgContent.selectAll("circle")
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
                return 10;
              })
              .attr("fill", "#3F51B5")
              .attr("stroke", "#fff");


          }else{
            //$scope.svg.selectAll("text").remove();
            $scope.svgContent.selectAll("circle").remove()
          }


        };


      }
    };
  });
