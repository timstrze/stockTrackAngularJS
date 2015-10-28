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

        $scope.svgContent = $scope.svg.append("g").attr('name', 'svgContent');


        //$scope.area = $scope.svgContent.append("path").attr('name', 'area');



        $scope.chartPositions = $scope.svgContent.append('path').attr('name', 'chartPositions');



        $scope.xAxis = $scope.svgContent.append('g').attr('name', 'xAxis');
        $scope.yAxis = $scope.svgContent.append('g').attr('name', 'yAxis');

        //$scope.yAxis
        //  .append('text')
        //  .attr('transform', 'rotate(-90)')
        //  .attr('y', 6)
        //  .attr('dy', '.71em')
        //  .style('text-anchor', 'end')
        //  .text('Price ($)')
        //  .attr('name', 'price');


        $scope.parseDate = d3.time.format('%Y-%m-%d').parse;

        $scope.resizeScene = function () {

          // Format the historical data for d3
          $scope.symbol.historicalData.forEach(function (d) {
            d.date = $scope.parseDate(d.Date);
            d.close = +d.Close;
            d.low = +d.Low;
          });

          // Add extra margin
          var margin = {top: 20, right: 40, bottom: 30, left: 0};
          // Get the width of the parent element
          $scope.width = element.parent()[0].offsetWidth - margin.left - margin.right;
          // Get the height of the parent element
          $scope.height = element.parent()[0].offsetHeight - margin.top - margin.bottom;

          $scope.svg
            .attr('width', $scope.width + margin.left + margin.right)
            .attr('height', $scope.height + margin.top + margin.bottom);

          $scope.svgContent
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        };


        $scope.renderPositions = function() {
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
          //  //var g = $scope.svg.append("g");
          //  //
          //  //var img = g.append("svg:image")
          //  //  .attr("xlink:href", "./images/icons/buy.svg")
          //  //  .attr("width", 50)
          //  //  .attr("height", 50)
          //  //  .attr("x", 228)
          //  //  .attr("y",53);
          //
          //
          //  $scope.svgContent.selectAll("circle").remove();
          //  $scope.svgContent.selectAll("circle")
          //    .data(positions.buys)
          //    .enter()
          //    .append("circle")
          //    .attr("cx", function(d, i) {
          //      return x($scope.parseDate(d.created.split(' ')[0]));
          //    })
          //    .attr("cy", function (d) {
          //      return y(d.ask);
          //    })
          //
          //    .attr("r", function(d) {
          //      return 10;
          //    })
          //    .attr("fill", "#3F51B5")
          //    .attr("stroke", "#fff");
          //
          //  //$scope.svg.selectAll("text").remove();
          //  //$scope.svg.selectAll("text")
          //  //  .data(positions.buys)
          //  //  .enter()
          //  //  .append("text")
          //  //  .attr("x", function(d, i) {
          //  //    return x($scope.parseDate(d.created.split(' ')[0]));
          //  //  })
          //  //  .attr("y", function (d) {
          //  //    return y(d.ask);
          //  //  })
          //  //  .text(function(d) {
          //  //    return d.ask;
          //  //  });
          //
          //}else{
          //  //$scope.svg.selectAll("text").remove();
          //  $scope.svgContent.selectAll("circle").remove()
          //}
        };


        $scope.renderXYAxis = function() {

          $scope.x = d3.time.scale()
            .range([0, $scope.width]);

          $scope.y = d3.scale.linear()
            .range([$scope.height, 0]);

          var xAxis = d3.svg.axis()
            .scale($scope.x)
            .orient("bottom");

          // Only toggle the modal if small size
          if($mdMedia('sm') || $mdMedia('md')) {
            xAxis.ticks(5);
          }

          var yAxis = d3.svg.axis()
            .scale($scope.y)
            .orient('right');

          $scope.x.domain(d3.extent($scope.symbol.historicalData, function (d) {
            return d.date;
          }));

          $scope.y.domain(d3.extent($scope.symbol.historicalData, function (d) {
            return d.low;
          }));

          $scope.xAxis
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + ($scope.height) + ')')
            .call(xAxis);

          $scope.yAxis
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + ($scope.width) + ',0)')
            .call(yAxis);
        };



        $scope.render = function() {
          $scope.resizeScene();
          $scope.renderXYAxis();

          if($scope.selectedChart === 'ohlc-chart') {
            LineChart.cleanUp();
            OHLCChart.render($scope, $scope.symbol.historicalData);
          }else if($scope.selectedChart === 'candlestick-chart') {
            LineChart.cleanUp();
            OHLCChart.render($scope, $scope.symbol.historicalData, true);
          }else {
            OHLCChart.cleanUp();
            LineChart.render($scope, $scope.symbol.historicalData);
          }
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
        $scope.$watch(function() {
          if($scope.symbol && $scope.symbol.historicalData) {
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
