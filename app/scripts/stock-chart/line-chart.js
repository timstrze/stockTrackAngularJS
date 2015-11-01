'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.LineChart
 * @description
 * # LineChart
 * Factory in the stockTrackAngularJsApp.
 */
angular.module('stockTrackAngularJsApp')
  .factory('LineChart', function () {

    var LineChart = {};

    LineChart.cleanUp = function() {
      LineChart.area.remove();
      LineChart.chartLine.remove();
    };


    LineChart.render = function ($scope, historicalData) {

      if(!LineChart.chartLine) {
        LineChart.chartLine = $scope.chartLine;
      }

      if(!LineChart.area) {
        LineChart.area = $scope.chartArea;
      }


      var line = d3.svg.line()
        .x(function (d) {
          return $scope.x(d.date);
        })
        .y(function (d) {
          return $scope.y(d.close);
        });

      var area = d3.svg.area()
        .x(function(d) { return $scope.x(d.date); })
        .y0($scope.height)
        .y1(function(d) { return $scope.y(d.close); });

      LineChart.area
        .datum(historicalData)
        .transition()
        .duration(500)
        .ease("linear")
        .attr("class", "area")
        .attr("d", area);

      LineChart.chartLine
        .datum(historicalData)
        .transition()
        .duration(500)
        .ease("linear")
        .attr('class', 'line')
        .attr('d', line)
        .attr('style', 'fill: none;stroke: steelblue;stroke-width: 1.5px;');
    };

    return LineChart;

  });
