'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.LoadingInterceptor
 * @description
 * # LoadingInterceptor
 * Factory in the stockTrackAngularJsApp.
 */
angular.module('stockTrackAngularJsApp')
  .factory('LoadingInterceptor', function ($rootScope, $q) {
    var numLoadings = 0;

    return {
      request: function (config) {

        numLoadings++;

        // Show loader
        $rootScope.$broadcast('loader_show');
        return config || $q.when(config);

      },
      response: function (response) {

        if ((--numLoadings) === 0) {
          // Hide loader
          $rootScope.$broadcast('loader_hide');
        }

        return response || $q.when(response);

      },
      responseError: function (response) {

        if (!(--numLoadings)) {
          // Hide loader
          $rootScope.$broadcast('loader_hide');
        }

        return $q.reject(response);
      }
    };
  });
