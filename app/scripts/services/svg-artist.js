'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.service:SvgArtist
 * @description
 * # SvgArtist
 * Factory that contains all the properties and methods for SvgArtist
 *
 */
angular.module('stockTrackAngularJsApp')
  .factory('SvgArtist', function ($rootScope) {

    var SvgArtist = function (properties) {
      // Create a reference to this
      var _this = this;
      // Loop over the keys of the object passed in
      Object.keys(properties).forEach(function (property) {
        // Set the properties of this Object
        _this[property] = properties[property];
      });

      this.Layers = [];
    };



    var mousedown = function (line, svg) {
      var m = d3.mouse(svg.node());
      line
        .attr("x1", m[0])
        .attr("y1", m[1])
        .attr("x2", m[0])
        .attr("y2", m[1])
        .attr({
          'class': 'drawn-line',
          'fill': 'none',
          'shape-rendering': 'crispEdges',
          'stroke-width': '2px',
          'stroke': 'steelblue',
          'stroke-linecap': 'round'
        });

      svg.on("mousemove", function () {
        mousemove(svg, line);
      });
    };

    var mousemove = function (svg, line) {
      var m = d3.mouse(svg.node());
      line.attr("x2", m[0])
        .attr("y2", m[1]);
    };

    var binaryblob = function (){
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
     * @ngdoc function
     * @name activateCreateLine
     * @methodOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.createNewLayer = function() {

      if(!this.svgContainer) {
        this.svgArtist = d3.select(this.target + " svg").append('g').attr('name', 'svgArtist').attr('class', 'svg-artist');
        this.svgContainer = d3.select(this.target + "  svg");
      }

      this.Layers.unshift({
        name: 'Layer ' + this.Layers.length,
        layer: this.svgArtist.append('g').attr('name', 'Layer ' + this.Layers.length).attr('class', 'layer'),
        items: []
      });

      this.selectedLayer =  this.Layers[0];

    };




    /**
     * @ngdoc function
     * @name activateCreateLine
     * @methodOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.activateCreateLine = function() {

      var _this = this;

      this.createLineActive = true;

      if(!this.svgContainer) {
        this.svgArtist = d3.select(this.target + " svg").append('g').attr('name', 'svgArtist').attr('class', 'svg-artist');
        this.svgContainer = d3.select(this.target + "  svg");
      }

      if(!this.selectedLayer) {
        if(this.Layers.length > 0) {
          this.selectedLayer =  this.Layers[0]
        }else{
          this.Layers.push({
            name: 'Layer 0',
            items: []
          })
        }
      }


      var svg = this.svgContainer;

      var line = this.selectedLayer.layer.append("line");

      svg
        .on("mousedown", function () {
          mousedown(line, svg);
        })
        .on("mouseup", function () {



          _this.createLineActive = false;
          svg.on("mousemove", null);
          svg.on("mousedown", null);
          svg.on("mouseup", null);
          $rootScope.$apply();
        });
    };


    /**
     * @ngdoc property
     * @name saveImageToDesktop
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.saveImageToDesktop = function() {
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
     * @ngdoc property
     * @name undoAction
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.selectLayer = function(item) {

      this.selectedLayer = item;
    };


    /**
     * @ngdoc property
     * @name undoAction
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.undoAction = function() {

      if(this.Layers.length > 0) {

        this.Layers[0].item.remove();

        this.Layers.shift();
      }
    };



    /**
     * @ngdoc property
     * @name clearAll
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.makeSelection = function() {

      this.selectItem = !this.selectItem;
    };


    /**
     * @ngdoc property
     * @name clearAll
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.removeAllLayers = function() {
      angular.forEach(this.Layers, function(layer) {
        angular.forEach(layer.items, function(item) {
          item.remove();
        });
      });

      this.Layers = [];
    };


    /**
     * @ngdoc property
     * @name removeLayer
     * @propertyOf stockTrackAngularJsApp.service:SvgArtist
     *
     * @description
     * Make service method available to the ng-repeat.
     */
    SvgArtist.prototype.removeLayer = function(layer) {
      console.log(layer)
    };


    return SvgArtist;

  });
