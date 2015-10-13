'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.LineChart
 * @description
 * # LineChart
 * Factory in the stockTrackAngularJsApp.
 */
angular.module('stockTrackAngularJsApp')
  .factory('LineChart', function ($mdMedia) {

    var LineChart = {};

    LineChart.render = function ($scope, element, historicalData) {

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

        //$scope.svg.selectAll("text").remove();
        //$scope.svg.selectAll("text")
        //  .data(positions.buys)
        //  .enter()
        //  .append("text")
        //  .attr("x", function(d, i) {
        //    return x($scope.parseDate(d.created.split(' ')[0]));
        //  })
        //  .attr("y", function (d) {
        //    return y(d.ask);
        //  })
        //  .text(function(d) {
        //    return d.ask;
        //  });

      }else{
        //$scope.svg.selectAll("text").remove();
        $scope.svgContent.selectAll("circle").remove()
      }


    };

    return LineChart;

  });
