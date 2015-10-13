'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:spark-line
 * @element spark-line
 * @restrict E
 *
 * @description
 * # sparkLine
 * Directive to build a spark line based off an ask history array
 *
 * @param {Object} symbol Symbol with ask history array: example [45.4, 45, 47]
 */

/*global d3 */

angular.module('stockTrackAngularJsApp')
  .directive('sparkLine', function () {
    return {
      scope: {
        symbol: '='
      },
      template: '<div class="spark-line"></div>',
      restrict: 'E',
      link: function postLink($scope, element) {



        /**
         * @ngdoc function
         * @name height
         * @propertyOf stockTrackAngularJsApp.directive:spark-line
         *
         * @description
         * Default height value
         *
         */
        $scope.height = 50;

        $scope.width = element.parent().prop('offsetWidth');


        /**
         * @ngdoc function
         * @name graph
         * @propertyOf stockTrackAngularJsApp.directive:spark-line
         *
         * @description
         * Create a container for the graph
         *
         */
        $scope.svg = d3.select(element[0].querySelector('.spark-line'))
          .append('svg:svg')
          .attr('width', $scope.width)
          .attr('height', $scope.height);

        $scope.yAxis = $scope.svg.append('g');

        //$scope.yAxis
        //  .append('text')
        //  .attr('transform', 'rotate(-90)')
        //  .attr('y', 6)
        //  .attr('dy', '.71em')
        //  .style('text-anchor', 'end')
        //  .text('Price ($)');



        /**
         * @ngdoc function
         * @name line
         * @propertyOf stockTrackAngularJsApp.directive:spark-line
         *
         * @description
         * Create a container for the line
         *
         */
        $scope.sparkLine = $scope.svg.append('svg:path');


        /**
         * @ngdoc function
         * @name render
         * @methodOf stockTrackAngularJsApp.directive:spark-line
         *
         * @description
         * Creates the spark line based off a Symbol's Ask History
         *
         */
        $scope.render = function (askHistory) {

          var yScale = d3.scale.linear()
            .domain([$scope.symbol.DaysLow, $scope.symbol.DaysHigh])
            .range([$scope.height, 0]);

          var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .ticks(0);


          // X scale will fit values from 0-10 within pixels 0-100
          var x = d3.scale.linear().domain([0, askHistory.length]).range([0, $scope.width]);
          // Y scale will fit values from 0-10 within pixels 0-100
          var y = d3.scale.linear().domain([$scope.symbol.DaysHigh, $scope.symbol.DaysLow]).range([0 , $scope.height]);

          //var y = d3.scale.linear().domain([d3.min(askHistory), d3.max(askHistory)]).range([$scope.symbol.DaysLow, $scope.symbol.DaysHigh]);
          // create a line object that represents the SVN line we're creating
          var line = d3.svg.line()
            // assign the X function to plot our line as we wish
            .x(function (d, i) {
              // return the X coordinate where we want to plot this datapoint
              return x(i);
            })
            .y(function (d) {
              // return the Y coordinate where we want to plot this datapoint
              return y(d);
            });



          $scope.yAxis
            .attr('class', 'y axis')
            .call(yAxis)
            .attr('transform', 'translate(5,0)');



          // display the line by appending an svg:path element with the data line we created above
          $scope.sparkLine.attr('d', line(askHistory)).transition();
        };



        /**
         * @ngdoc function
         * @name $watch
         * @eventOf stockTrackAngularJsApp.directive:spark-line
         *
         * @description
         * Watches the Symbol askHistory Array and calls the animate Function.
         *
         */
        $scope.$watch('symbol.askHistory', function() {
          if($scope.symbol && $scope.symbol.askHistory && $scope.symbol.askHistory.length) {
            $scope.render($scope.symbol.askHistory);
          }
        }, true);

      }
    };
  });
