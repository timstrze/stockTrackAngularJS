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
  .directive('baseChart', function ($window, $mdMedia, LineChart, OHLCChart) {
    return {
      scope: {
        symbol: '=',
        selectedChart: '=',
        positions: '='
      },
      template: '<div class="base-chart"></div>',
      link: function postLink($scope, element) {

        $scope.svg = d3.select(element[0]
          .querySelector('.base-chart'))
          .append('svg');

        $scope.svgContent = $scope.svg.append('g').attr('name', 'svgContent');


        //$scope.chartPositions = $scope.svgContent.append('path').attr('name', 'chartPositions');


        // Add extra margin
        $scope.margin = {top: 20, right: 40, bottom: 30, left: 0};


        var gradient = $scope.svgContent.append('svg:defs')
          .append('svg:linearGradient')
          .attr('id', 'gradient')
          .attr('x1', '100%')
          .attr('y1', '100%')
          .attr('x2', '100%')
          .attr('y2', '0%')
          .attr('spreadMethod', 'pad');

        gradient.append('svg:stop')
          .attr('offset', '0%')
          .attr('stop-color', '#fff')
          .attr('stop-opacity', 1);

        gradient.append('svg:stop')
          .attr('offset', '100%')
          .attr('stop-color', '#b8e1fc')
          .attr('stop-opacity', 1);

        $scope.chartArea = $scope.svgContent.append('path').attr('name', 'chartArea')
          .style('fill', 'url(#gradient)');


        $scope.chartLine = $scope.svgContent.append('path').attr('name', 'chartLine');


        $scope.movingAvgLine = $scope.svgContent.append('svg:path').attr('class', 'avg');


        $scope.xAxis = $scope.svgContent.append('g').attr('name', 'xAxis');
        $scope.yAxis = $scope.svgContent.append('g').attr('name', 'yAxis');

        $scope.horizontalGrid = $scope.svgContent.append('g').attr('name', 'horizontalGrid');
        $scope.verticalGrid = $scope.svgContent.append('g').attr('name', 'verticalGrid');

        $scope.legend = $scope.svgContent.append('rect').attr('name', 'legend');
        $scope.legendText = $scope.svgContent.append('foreignObject').attr('name', 'legendText')
          .attr("x", '20');

        $scope.parseDate = d3.time.format('%Y-%m-%d').parse;

        $scope.getBollingerBands = function (n, k, data) {
          var bands = []; //{ ma: 0, low: 0, high: 0 }
          for (var i = n - 1, len = data.length; i < len; i++) {
            var slice = data.slice(i + 1 - n, i);
            var mean = d3.mean(slice, function (d) {
              return d.close;
            });
            var stdDev = Math.sqrt(d3.mean(slice.map(function (d) {
              return Math.pow(d.close - mean, 2);
            })));
            bands.push({
              date: data[i].date,
              ma: mean,
              low: mean - (k * stdDev),
              high: mean + (k * stdDev)
            });
          }
          return bands;
        };


        $scope.resizeScene = function () {

          // Format the historical data for d3
          $scope.symbol.historicalData.forEach(function (d) {
            d.date = $scope.parseDate(d.Date);
            d.close = +d.Close;
            d.low = +d.Low;
          });

          // Get the width of the parent element
          $scope.width = element.parent()[0].offsetWidth - $scope.margin.left - $scope.margin.right;
          // Get the height of the parent element
          $scope.height = element.parent()[0].offsetHeight - $scope.margin.top - $scope.margin.bottom;

          $scope.x = d3.time.scale()
            .range([0, $scope.width]);

          $scope.y = d3.scale.linear()
            .range([$scope.height, 0]);

          $scope.x.domain(d3.extent($scope.symbol.historicalData, function (d) {
            return d.date;
          }));

          var n = 20; // n-period of moving average
          var k = 2;  // k times n-period standard deviation above/below moving average


          var bandsData = $scope.getBollingerBands(n, k, $scope.symbol.historicalData);


          $scope.y.domain(d3.extent($scope.symbol.historicalData, function (d) {
            return d.close;
          }));


          $scope.svg
            .attr('width', $scope.width + $scope.margin.left + $scope.margin.right)
            .attr('height', $scope.height + $scope.margin.top + $scope.margin.bottom);

          $scope.svgContent
            .attr('transform', 'translate(' + $scope.margin.left + ',' + $scope.margin.top + ')');
        };


        $scope.renderPositions = function () {
          //var positions;
          //
          //// Loop over the Positions
          //angular.forEach($scope.positions, function (position) {
          //  // Check to see if Symbols match
          //  if (position.Symbol.Symbol.toLowerCase() === $scope.symbol.Symbol.toLowerCase()) {
          //    positions = position;
          //  }
          //});

          //if(positions) {
          //  var x = d3.time.scale()
          //    .range([0, $scope.width]);
          //
          //  var y = d3.scale.linear()
          //    .range([$scope.height, 0]);
          //
          //  //var g = $scope.svg.append('g');
          //  //
          //  //var img = g.append('svg:image')
          //  //  .attr('xlink:href', './images/icons/buy.svg')
          //  //  .attr('width', 50)
          //  //  .attr('height', 50)
          //  //  .attr('x', 228)
          //  //  .attr('y',53);
          //
          //
          //  $scope.svgContent.selectAll('circle').remove();
          //  $scope.svgContent.selectAll('circle')
          //    .data(positions.buys)
          //    .enter()
          //    .append('circle')
          //    .attr('cx', function(d, i) {
          //      return x($scope.parseDate(d.created.split(' ')[0]));
          //    })
          //    .attr('cy', function (d) {
          //      return y(d.ask);
          //    })
          //
          //    .attr('r', function(d) {
          //      return 10;
          //    })
          //    .attr('fill', '#3F51B5')
          //    .attr('stroke', '#fff');
          //
          //  //$scope.svg.selectAll('text').remove();
          //  //$scope.svg.selectAll('text')
          //  //  .data(positions.buys)
          //  //  .enter()
          //  //  .append('text')
          //  //  .attr('x', function(d, i) {
          //  //    return x($scope.parseDate(d.created.split(' ')[0]));
          //  //  })
          //  //  .attr('y', function (d) {
          //  //    return y(d.ask);
          //  //  })
          //  //  .text(function(d) {
          //  //    return d.ask;
          //  //  });
          //
          //}else{
          //  //$scope.svg.selectAll('text').remove();
          //  $scope.svgContent.selectAll('circle').remove()
          //}
        };


        $scope.renderXYAxis = function () {


          var xAxis = d3.svg.axis()
            .scale($scope.x)
            .orient('bottom');


          //.innerTickSize(-$scope.height)
          //.outerTickSize(0)
          //.tickPadding(10);

          // Only toggle the modal if small size
          if ($mdMedia('sm') || $mdMedia('md')) {
            xAxis.ticks(5);
          }

          var yAxis = d3.svg.axis()
            .scale($scope.y)
            .orient('right');


          //.innerTickSize(-$scope.width)
          //.outerTickSize(0)
          //.tickPadding(10);


          $scope.xAxis
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + ($scope.height) + ')')
            .call(xAxis);


          $scope.yAxis
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + ($scope.width) + ',0)')
            .call(yAxis);


          //$scope.yAxisLines
          //  //.attr('transform', 'translate(-20,'+h+')')
          //  .call(d3.svg.axis()
          //    .scale(xAxis)
          //    .orient('bottom')
          //    .ticks(4)
          //    .tickSize(-$scope.height,0,0)
          //    .tickFormat('')
          //)

          $scope.horizontalGrid.selectAll('line').remove();

          var horizontalGridLine =  $scope.horizontalGrid.selectAll('line').data($scope.y.ticks(4));

          horizontalGridLine
            .enter()
            .append('line')
            .attr(
            {
              'class': 'horizontalGrid',
              'x1': 0,
              'x2': $scope.width,
              'y1': function (d) {
                return $scope.y(d);
              },
              'y2': function (d) {
                return $scope.y(d);
              },
              'fill': 'none',
              'shape-rendering': 'crispEdges',
              'stroke': '#C7C7C7',
              'stroke-width': '1px',
              'stroke-dasharray': '5, 5'
            });

          horizontalGridLine.exit().remove();

          $scope.verticalGrid.selectAll('line').remove();

          var verticalGridLine = $scope.verticalGrid.selectAll('line')
            .data($scope.x.ticks(12));

          verticalGridLine
            .enter()
            .append('line')
            .attr(
            {
              'class': 'verticalGrid',
              'x1': function (d) {
                return $scope.x(d);
              },
              'x2': function (d) {
                return $scope.x(d);
              },
              'y1': -$scope.margin.top,
              'y2': $scope.height,
              'fill': 'none',
              'shape-rendering': 'crispEdges',
              'stroke': '#C7C7C7',
              'stroke-width': '1px',
              'stroke-dasharray': '5, 5'
            });

          verticalGridLine.exit().remove();


          var movingAvg = function (n) {
            return function (points) {
              points = points.map(function (each, index, array) {
                var to = index + n - 1;
                var subSeq, sum;
                if (to < points.length) {
                  subSeq = array.slice(index, to + 1);
                  sum = subSeq.reduce(function (a, b) {
                    return [a[0] + b[0], a[1] + b[1]];
                  });
                  return sum.map(function (each) {
                    return each / n;
                  });
                }
                return undefined;
              });
              points = points.filter(function (each) {
                return typeof each !== 'undefined'
              });
              // Transform the points into a basis line
              var pathDesc = d3.svg.line().interpolate('basis')(points);
              // Remove the extra 'M'
              return pathDesc.slice(1, pathDesc.length);
            }
          };


          //var _movingSum;
          var movingAverageLine = d3.svg.line()
            .x(function (d, i) {
              return $scope.x(d.date);
            })
            .y(function (d, i) {
              return $scope.y(d.close);
            })
            .interpolate(movingAvg(3));

          $scope.movingAvgLine
            .attr('d', movingAverageLine($scope.symbol.historicalData));


        };


        $scope.render = function () {
          $scope.resizeScene();

          if ($scope.selectedChart === 'ohlc-chart') {
            LineChart.cleanUp();
            OHLCChart.render($scope, $scope.symbol.historicalData);
          } else if ($scope.selectedChart === 'candlestick-chart') {
            LineChart.cleanUp();
            OHLCChart.render($scope, $scope.symbol.historicalData, true);
          } else {
            OHLCChart.cleanUp();
            LineChart.render($scope, $scope.symbol.historicalData);
          }

          $scope.renderXYAxis();


          //$scope.legend
          //  .attr('x', '50')
          //  .attr('y', '20')
          //  .attr('rx', '20')
          //  .attr('ry', '20')
          //  .attr('width', '150')
          //  .attr('height', '150')
          //  .attr('style', 'fill:red;stroke:black;stroke-width:5;opacity:.5');

          var newHtml = '<div style="width:112px;height:100px;">' +
            '<b>' + moment().format('MM-DD-YYYY') + '</b>' +
            '<br> Open: '+ $scope.symbol.Open +
            '<br> High: '+ $scope.symbol.DaysHigh +
            '<br> Low: '+ $scope.symbol.DaysLow +
            '<br> Ask: '+ $scope.symbol.Ask +
            '</div>';

          $scope.legendText.html(newHtml)
            .attr("y", $scope.height - 120)


        };


        /**
         * @ngdoc function
         * @name $watch
         * @eventOf stockTrackAngularJsApp.directive:base-chart
         *
         * @description
         * Watches the Symbol historicalData Array and calls the render Function.
         *
         */
        $scope.$watch(function () {
          if ($scope.symbol && $scope.symbol.historicalData) {
            return JSON.stringify([$scope.symbol.historicalData, $scope.selectedChart]);
          }
        }, function () {
          // Make sure there is historical data
          if ($scope.symbol && $scope.symbol.historicalData && $scope.symbol.historicalData.length > 0) {
            $scope.render();
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
            $scope.render();
          }
        });
      }
    };
  });
