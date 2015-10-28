'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.OHLCChart
 * @description
 * # OHLCChart
 * Factory in the stockTrackAngularJsApp.
 */
angular.module('stockTrackAngularJsApp')
  .factory('OHLCChart', function () {

    var OHLCChart = {};



    OHLCChart.cleanUp = function() {
      //OHLCChart.area.remove();
      //OHLCChart.chartLine.remove();
    };

    var line = d3.svg.line()
      .x(function (d) {
        return d.x;
      })
      .y(function (d) {
        return d.y;
      });

    var isUpDay = function(d) {
      return d.close > d.Open;
    };

    var isDownDay = function (d) {
      return d.Open > d.close;
    };

    var applyOHLC = function ($scope, bars) {

      var open,
        close,
        tickWidth = 5;

      open = bars.selectAll('.open-tick').data(function (d) {
        return [d];
      });

      close = bars.selectAll('.close-tick').data(function (d) {
        return [d];
      });

      open.enter().append('path');
      close.enter().append('path');

      open.classed('open-tick', true)
        .transition()
        .duration(500)
        .ease("linear")
        .attr('d', function (d) {
          return line([
            {x: $scope.x(d.date) - tickWidth, y: $scope.y(d.Open)},
            {x: $scope.x(d.date), y: $scope.y(d.Open)}
          ]);
        });

      close.classed('close-tick', true)
        .transition()
        .duration(500)
        .ease("linear")
        .attr('d', function (d) {
          return line([
            {x: $scope.x(d.date), y: $scope.y(d.close)},
            {x: $scope.x(d.date) + tickWidth, y: $scope.y(d.close)}
          ]);
        });

    };

    var applyCandlestick = function ($scope, bars) {

      var rect,
        rectangleWidth = 3;

      rect = bars.selectAll('rect').data(function (d) {
        return [d];
      });

      rect.enter().append('rect');

      rect
        .transition()
        .duration(500)
        .ease("linear")
        .attr('x', function (d) {
          return $scope.x(d.date) - rectangleWidth;
        })
        .attr('y', function (d) {
          return isUpDay(d) ? $scope.y(d.close) : $scope.y(d.Open);
        })
        .attr('width', rectangleWidth * 2)
        .attr('height', function (d) {
          return isUpDay(d)
            ? $scope.y(d.Open) - $scope.y(d.close)
            : $scope.y(d.close) - $scope.y(d.Open);
        });

    };

    OHLCChart.render = function ($scope, historicalData, isCandlestick) {

      var bars = $scope.svgContent.selectAll('.bar')
        .data(historicalData, function (d) {
          return d.date;
        });

      bars.enter()
        .append('g')
        .classed('bar', true);

      bars.classed({
        'up-day': isUpDay,
        'down-day': isDownDay
      });

      var paths = bars.selectAll('.high-low-line').data(function (d) {
        return [d];
      });

      paths.enter().append('path');

      paths.classed('high-low-line', true)
        .transition()
        .duration(500)
        .ease("linear")
        .attr('d', function (d) {
          return line([
            { x: $scope.x(d.date), y: $scope.y(d.High) },
            { x: $scope.x(d.date), y: $scope.y(d.Low) }
          ]);
        });

      if(isCandlestick) {
        applyCandlestick($scope, bars);
      }else{
        applyOHLC($scope, bars);
      }

    };



    return OHLCChart;

  });
