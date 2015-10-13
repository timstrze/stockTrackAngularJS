'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.service:Market
 * @description
 * # Market
 * Factory that contains all the properties and methods for a Market
 *
 */
angular.module('stockTrackAngularJsApp')
  .factory('Market', function () {

    var Market = {};



    /**
     * @ngdoc function
     * @name Market.time
     * @methodOf stockTrackAngularJsApp.service:Market
     *
     * @description
     * Public access to the GET, PUT, and POST methods
     *
     * @param {String} ID of the Market
     */
    Market.time = '9:30 AM to 4:00 PM ET';


    return Market;

  });
