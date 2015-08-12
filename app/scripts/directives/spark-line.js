'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:sparkLine
 * @description
 * # sparkLine
 */
angular.module('stockTrackAngularJsApp')
  .directive('sparkLine', function () {
    return {
      template: '<div class="spark-line"></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // create an SVG element inside the #graph div that fills 100% of the div
        var graph = d3.select(element[0].querySelector('.spark-line')).append("svg:svg").attr("width", "100%").attr("height", "40px").attr("style", "padding-top:9px");
        // create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
        var data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9];
        // X scale will fit values from 0-10 within pixels 0-100
        var x = d3.scale.linear().domain([0, 10]).range([0, 50]);
        // Y scale will fit values from 0-10 within pixels 0-100
        var y = d3.scale.linear().domain([0, 10]).range([0, 30]);
        // create a line object that represents the SVN line we're creating
        var line = d3.svg.line()
          // assign the X function to plot our line as we wish
          .x(function (d, i) {
            // verbose logging to show what's actually being done
            //console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
            // return the X coordinate where we want to plot this datapoint
            return x(i);
          })
          .y(function (d) {
            // verbose logging to show what's actually being done
            //console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
            // return the Y coordinate where we want to plot this datapoint
            return y(d);
          });

        // display the line by appending an svg:path element with the data line we created above
        graph.append("svg:path").attr("d", line(data));
      }
    };
  });
