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
 * @param {Array} askHistory Symbol ask history array: example [45.4, 45, 47]
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


        /**
         * @ngdoc function
         * @name graph
         * @propertyOf stockTrackAngularJsApp.directive:spark-line
         *
         * @description
         * Create a container for the graph
         *
         */
        $scope.graph = {};



        /**
         * @ngdoc function
         * @name line
         * @propertyOf stockTrackAngularJsApp.directive:spark-line
         *
         * @description
         * Create a container for the line
         *
         */
        $scope.line = {};


        /**
         * @ngdoc function
         * @name width
         * @propertyOf stockTrackAngularJsApp.directive:spark-line
         *
         * @description
         * The parent element's width
         *
         */
        $scope.width = element.parent().prop('offsetWidth');


        /**
         * @ngdoc function
         * @name height
         * @propertyOf stockTrackAngularJsApp.directive:spark-line
         *
         * @description
         * Default height value
         *
         */
        $scope.height = 40;


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
          //var width = element.parent().prop('offsetWidth');
          //var height = 40;
          // TODO: figure out a better way
          element.find('div').empty();
          // create an SVG element inside the #graph div that fills 100% of the div
          // TODO: figure out a better way
          $scope.graph = d3.select(element[0].querySelector('.spark-line'))
            // TODO: figure out a better way
            .append('svg:svg').attr('width', '100%').attr('height', '40px').attr('style', 'padding-top:9px');
          // create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
          // X scale will fit values from 0-10 within pixels 0-100
          var x = d3.scale.linear().domain([0, askHistory.length]).range([0, $scope.width]);
          // Y scale will fit values from 0-10 within pixels 0-100
          var y = d3.scale.linear().domain([d3.min(askHistory), d3.max(askHistory)]).range([0 , $scope.height-15]);
          // create a line object that represents the SVN line we're creating
          $scope.line = d3.svg.line()
            // assign the X function to plot our line as we wish
            .x(function (d, i) {
              // return the X coordinate where we want to plot this datapoint
              return x(i);
            })
            .y(function (d) {
              // return the Y coordinate where we want to plot this datapoint
              return y(d);
            });
          // display the line by appending an svg:path element with the data line we created above
          // TODO: figure out a better way
          $scope.graph.append('svg:path').attr('d', $scope.line(askHistory));
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
        $scope.$watch('askHistory', function() {
          if($scope.askHistory && $scope.askHistory.length) {
            $scope.render($scope.askHistory);
          }
        }, true);

      }
    };
  });
