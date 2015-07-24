'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:graph
 * @description
 * # graph
 */
angular.module('stockTrackAngularJsApp')
  .directive('graph', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        // Define linear scales representing the pixel dimensions
        var x = d3.scale.linear()
          .domain([0, 450])
          .range([0, 450]);

        var y = d3.scale.linear()
          .domain([0,300])
          .range([0, 300]);

// define an SVG element to hold our chart
        var chart = d3.select("body").append("svg")
          .attr("class", "chart")
          .attr("width", 490) // more space to accomodate our axis labels
          .attr("height", 320) // moar space!
          .append("g")
          .attr("transform", "translate(20,15)"); // move base coordinates over/down a bit so lines start at 0,0

// draw the X grid lines
        chart.selectAll("line.x")
          .data(x.ticks(10))
          .enter().append("line")
          .attr("class", "x")
          .attr("x1", x)
          .attr("x2", x)
          .attr("y1", 0)
          .attr("y2", 300)
          .style("stroke", "#ccc");

// draw the Y axis grid lines
        chart.selectAll("line.y")
          .data(y.ticks(10))
          .enter().append("line")
          .attr("class", "y")
          .attr("x1", 0)
          .attr("x2", 450)
          .attr("y1", y)
          .attr("y2", y)
          .style("stroke", "#ccc");

// add the X axis labels
        chart.selectAll(".rule")
          .data(x.ticks(10))
          .enter().append("text")
          .attr("x", x)
          .attr("y", 0)
          .attr("dy", -3)
          .attr("text-anchor", "middle")
          .text(String);

// add the Y axis labels
        chart.selectAll(".rule")
          .data(y.ticks(10))
          .enter().append("text")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", 3) // shift down slightly
          .attr("dx", -3)  // and to the left
          .attr("text-anchor", "end") // align right
          .text(function(d) { return d == 0 ? '' : d;});

// add the darker X axis line
        chart.append("line")
          .attr("x1", 0)
          .attr("x2", 450)
          .style("stroke", "#000");

// add the darker Y axis line
        chart.append("line")
          .attr("y1", 0)
          .attr("y2", 300)
          .style("stroke", "#000");
      }
    };
  });
