'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:watch-list-details
 * @element watch-list-details
 * @restrict E
x *
 * @description
 * Display the selected Symbol's details and graphs.
 *
 * @param {Object} symbol Symbol Object
 * @param {Object} user User Object
 *
 */
angular.module('stockTrackAngularJsApp')
  .directive('watchListDetails', function ($mdDialog, $window, SymbolList, Constants) {
    return {
      restrict: 'E',
      scope: {
        symbol: '=',
        user: '='
      },
      templateUrl: 'views/directives/watch-list-details.html',
      controller: function ($scope) {

        $scope.Constants = Constants;

        $scope.selectedChart = Constants.chartTypes[0].slug;
        $scope.selectedExtras = Constants.chartExtras.map(function(d) {return d.slug;});

        /**
         * @ngdoc property
         * @name historicalDateRange
         * @propertyOf stockTrackAngularJsApp.directive:watch-list-details
         *
         * @description
         * Make service method available to the ng-repeat.
         */
        $scope.historicalDateRange = Constants.historicalDateRange();


        $scope.selectedHistoricalDateRange = $scope.historicalDateRange[2].slug;



        /**
         * @ngdoc property
         * @name opensNewsWindow
         * @propertyOf stockTrackAngularJsApp.directive:watch-list-details
         *
         * @description
         * Make service method available to the ng-repeat.
         */
        $scope.openNewsWindow = function(url) {
          $window.open(url, '_blank')
        };

        /**
         * @ngdoc property
         * @name opensNewsWindow
         * @propertyOf stockTrackAngularJsApp.directive:watch-list-details
         *
         * @description
         * Make service method available to the ng-repeat.
         */
        $scope.createLine = function() {
          var line;

          var vis =
            d3.select(".base-chart svg")
          .on("mousedown", mousedown)
            .on("mouseup", mouseup);

          function mousedown() {
            var m = d3.mouse(this);
            line = vis.append("line")
              .attr("x1", m[0])
              .attr("y1", m[1])
              .attr("x2", m[0])
              .attr("y2", m[1])
              .attr(
                  {
                    'class': 'drawn-line',
                    'fill': 'none',
                    'shape-rendering': 'crispEdges',
                    'stroke-width': '2px',
                    'stroke': 'steelblue',
                    'stroke-linecap': 'round'
                  });

            vis.on("mousemove", mousemove);
          }

          function mousemove() {
            var m = d3.mouse(this);
            line.attr("x2", m[0])
              .attr("y2", m[1]);
          }

          function mouseup() {
            vis.on("mousemove", null);
          }
        };



        function binaryblob(){
          var byteString = atob(document.querySelector("canvas").toDataURL().replace(/^data:image\/(png|jpg);base64,/, "")); //wtf is atob?? https://developer.mozilla.org/en-US/docs/Web/API/Window.atob
          var ab = new ArrayBuffer(byteString.length);
          var ia = new Uint8Array(ab);
          for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          var dataView = new DataView(ab);
          var blob = new Blob([dataView], {type: "image/png"});
          var DOMURL = self.URL || self.webkitURL || self;
          var newurl = DOMURL.createObjectURL(blob);

          var img = '<img src="'+newurl+'">';
          d3.select("#img").html(img);
        }


        /**
         * @ngdoc property
         * @name saveImageToDesktop
         * @propertyOf stockTrackAngularJsApp.directive:watch-list-details
         *
         * @description
         * Make service method available to the ng-repeat.
         */
        $scope.saveImageToDesktop = function() {
          var html = d3.select(".base-chart svg")
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .node().parentNode.innerHTML;

          //console.log(html);
          var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
          var img = '<img src="'+imgsrc+'">';
          d3.select("#svgdataurl").html(img);

          var canvas = document.querySelector(".export-canvas");

          var someImage = d3.select(".base-chart svg").node().getBoundingClientRect();

          canvas.height = someImage.height;
          canvas.width = someImage.width;

          var context = canvas.getContext("2d");

          var image = new Image;
          image.src = imgsrc;
          image.onload = function() {
            context.drawImage(image, 0, 0);

            //save and serve it as an actual filename
            binaryblob();

            var a = document.createElement("a");
            a.download = "sample.png";
            a.href = canvas.toDataURL("image/png");

            var pngimg = '<img src="'+a.href+'">';
            d3.select("#pngdataurl").html(pngimg);

            a.click();
          };
        };



        /**
         * @ngdoc function
         * @name $watch
         * @eventyOf stockTrackAngularJsApp.directive:watch-list-details
         *
         * @description
         * Watches the Symbol historicalData Array and calls the render Function.
         *
         */
        $scope.$watch('symbol', function () {
          // Make sure there is historical data
          if ($scope.symbol && $scope.user && $scope.user.Positions && $scope.user.Positions.length) {
            $scope.positions = {};

            // Loop over the Positions
            angular.forEach($scope.user.Positions, function (position) {
              // Check to see if Symbols match
              if (position.Symbol.Symbol.toLowerCase() === $scope.symbol.Symbol.toLowerCase()) {
                $scope.positions = position;
              }
            });

          }
        }, true);

      }
    };
  });
