'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.service:LoadingInterceptor
 * @description
 * # LoadingInterceptor
 * Factory to broadcast the loading message to the app.
 */
angular.module('stockTrackAngularJsApp')
  .factory('LoadingInterceptor', function ($rootScope, $q) {

    // Set the default number of loadings value
    var numLoadings = 0;

    return {


      /**
       * @ngdoc function
       * @name LoadingInterceptor.request
       * @methodOf stockTrackAngularJsApp.service:LoadingInterceptor
       *
       * @description
       * Every request adds to the number of loadings.
       *
       * @param {Object} config Promise Object
       *
       * @return {Object} Return the promise Object
       *
       */
      request: function (config) {
        // Adds to the number of loadings
        numLoadings++;
        // Broadcast to the app to show the loader
        $rootScope.$broadcast('loader_show');
        // Return the promise
        return config || $q.when(config);
      },


      /**
       * @ngdoc function
       * @name LoadingInterceptor.response
       * @methodOf stockTrackAngularJsApp.service:LoadingInterceptor
       *
       * @description
       * Every response removes from the number of loadings.
       *
       * @param {Object} response Promise Object
       *
       * @return {Object} Return the promise Object
       *
       */
      response: function (response) {
        // Removes from the number of loadings
        --numLoadings;
        // Check to see if it's the last one
        if (numLoadings === 0) {
          // Broadcast to the app to remove the loader
          $rootScope.$broadcast('loader_hide');
        }
        // Return the promise
        return response || $q.when(response);
      },


      /**
       * @ngdoc function
       * @name LoadingInterceptor.responseError
       * @methodOf stockTrackAngularJsApp.service:LoadingInterceptor
       *
       * @description
       * Every response error removes from the number of loadings.

       * @param {Object} response Promise Object
       *
       * @return {Object} Return the promise Object
       *
       */
      responseError: function (response) {
        // Removes from the number of loadings
        --numLoadings;
        // Check to see if it's the last one
        if (numLoadings === 0) {
          // Broadcast to the app to remove the loader
          $rootScope.$broadcast('loader_hide');
        }
        // Return the promise
        return $q.reject(response);
      }
    };
  });
