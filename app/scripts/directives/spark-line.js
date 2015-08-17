'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:spark-line
 * @description
 * # sparkLine
 */

/*global d3 */

angular.module('stockTrackAngularJsApp')
  .directive('sparkLine', function () {
    return {
      scope: {
        askHistory: '='
      },
      template: '<div class="spark-line"></div>',
      restrict: 'E',
      link: function postLink($scope, element) {
        // create an SVG element inside the #graph div that fills 100% of the div
        var graph, data, line;
//        var max=0, min=0, len= 0, p=2;


        var width = element.parent().prop('offsetWidth');
        var height = 40;
        // X scale will fit values from 0-10 within pixels 0-100
        var x;
//        var x = d3.scale.linear().domain([0, 10]).range([0, 50]);
        // Y scale will fit values from 0-10 within pixels 0-100
//        var y = d3.scale.linear().domain([0, 10]).range([0, 30]);
        // create a line object that represents the SVN line we're creating

        var y;

//        var x = d3.scale.linear().range([0, width]);
//        var y = d3.scale.linear().range([height, 0]);

        var animate = function (askHistory) {
//
//          for(var ask in askHistory) {
//            min = d3.min([d3.min(askHistory[ask]), min]);
//            max = d3.max([d3.max(askHistory[ask]), max]);
//            len = d3.max([askHistory[ask].length, len]);
//          }

          element.find('div').empty();
          // create an SVG element inside the #graph div that fills 100% of the div
          graph = d3.select(element[0].querySelector('.spark-line')).append('svg:svg').attr('width', '100%').attr('height', '40px').attr('style', 'padding-top:9px');
          // create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
          data = askHistory;

          x = d3.scale.linear().domain([0, askHistory.length]).range([0, width]);


//          x = d3.scale.linear().domain([0, len]).range([p, width - p]);
//          y = d3.scale.linear().domain([min, max]).range([height - p, p]);

//          x = d3.scale.ordinal()
//            .domain(dataset.map(function(d) { return d.QYear; }))
//            .rangeRoundBands([0, width], .04);
//
//          y = d3.scale.linear()
//            .domain([0, d3.max(data)])
//            .range([height, 0]);

          y = d3.scale.linear().domain([d3.min(askHistory), d3.max(askHistory)]).range([0 , height-15]);

          // create a line object that represents the SVN line we're creating
          line = d3.svg.line()
            // assign the X function to plot our line as we wish
            .x(function (d, i) {
              // verbose logging to show what's actually being done
              //console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
              // return the X coordinate where we want to plot this datapoint
              return x(i);
            })
            .y(function (d) {
              // verbose logging to show what's actually being done
              //console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + ' using our yScale.');
              // return the Y coordinate where we want to plot this datapoint
              return y(d);
            });

          // display the line by appending an svg:path element with the data line we created above
          graph.append('svg:path').attr('d', line(data));
        };


        $scope.$watch('askHistory', function() {
          if($scope.askHistory && $scope.askHistory.length) {
            animate($scope.askHistory);
          }
        }, true);


      }
    };
  });
