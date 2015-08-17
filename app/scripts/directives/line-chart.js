'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:line-chart
 * @description
 * # lineChart
 */

/*global d3 */

angular.module('stockTrackAngularJsApp')
  .directive('lineChart', function ($window) {
    return {
      scope: {
        historicalData: '='
      },
      restrict: 'E',
      link: function postLink(scope, element) {
        //var margin, width, height, x, y, xAxis, yAxis;
        //
        //margin = {top: 20, right: 20, bottom: 30, left: 50};
        //
        var parseDate = d3.time.format('%Y-%m-%d').parse;
        //
        //var line = d3.svg.line();
        //var svg = d3.select(element[0]).append('svg');
        //
        //var theXAxis = svg.append('g')
        //  .attr('class', 'x axis');
        //
        //var theYAxis = svg.append('g')
        //  .attr('class', 'y axis');
        //
        //var priceText = theYAxis
        //  .append('text')
        //  .attr('transform', 'rotate(-90)')
        //  .attr('y', 6)
        //  .attr('dy', '.71em')
        //  .style('text-anchor', 'end')
        //  .text('Price ($)');
        //
        //var theLines = svg.append('path')
        //  .attr('class', 'line');

        //var svg = d3.select('body').append('svg')

        var render = function () {

          if (!scope.historicalData) {
            return false;
          }

          //width = element.parent()[0].offsetWidth - margin.left - margin.right;
          //height = element.parent()[0].offsetHeight - margin.top - margin.bottom;


          var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = element.parent()[0].offsetWidth - margin.left - margin.right,
            height = element.parent()[0].offsetHeight - margin.top - margin.bottom;

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

          d3.select(element[0]).selectAll('*').remove();
          //var svg = d3.select(element[0]).append('svg');

          var svg = d3.select(element[0]).append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          scope.historicalData.forEach(function (d) {
            d.date = parseDate(d.Date);
            d.close = +d.Close;
          });

          x.domain(d3.extent(scope.historicalData, function (d) {
            return d.date;
          }));
          y.domain(d3.extent(scope.historicalData, function (d) {
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
            .datum(scope.historicalData)
            .attr('class', 'line')
            .attr('d', line);

        };


        scope.$watch('historicalData', function () {
          render();
        }, true);


        angular.element($window).on('resize', function () {
          render();
        });

      }
    };
  });
