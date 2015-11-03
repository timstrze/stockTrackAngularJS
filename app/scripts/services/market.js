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
  .factory('Market', function ($interval) {

    var Market = {};

    /**
     * @ngdoc function
     * @name Market.Open
     * @propertyOf stockTrackAngularJsApp.service:Market
     *
     * @description
     * Open time
     *
     */
    Market.Open = 930;


    /**
     * @ngdoc function
     * @name Market.Close
     * @propertyOf stockTrackAngularJsApp.service:Market
     *
     * @description
     * Close time
     *
     */
    Market.Close = 1600;



    /**
     * @ngdoc function
     * @name Market.isOpen
     * @propertyOf stockTrackAngularJsApp.service:Market
     *
     * @description
     * Is the Market open?
     *
     */
    Market.isOpen = false;




    /**
     * @ngdoc function
     * @name Market.init
     * @propertyOf stockTrackAngularJsApp.service:Market
     *
     * @description
     * Starts checking the
     *
     */
    Market.init = function () {
      var _this = this;
      this.checkMarketStatus();
      this.interval = $interval(function(){
        _this.checkMarketStatus();
      }, 60000);
    };



    /**
     * @ngdoc function
     * @name Market.checkMarketStatus
     * @propertyOf stockTrackAngularJsApp.service:Market
     *
     * @description
     * Returns an array of order types
     *
     */
    Market.checkMarketStatus = function () {

      var now = moment.tz("America/New_York").format('HHmm');
      var dayOfWeek = moment().day();

      if ((Market.Close > now && now > Market.Open) && (dayOfWeek > 0 && dayOfWeek < 6)) {
        Market.isOpen = true;
      } else {
        Market.isOpen = false;
      }
    };

    return Market;

  });
