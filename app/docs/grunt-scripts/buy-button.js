'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:buy-button
 * @description
 * # buyButton
 *
 * @example
 <example module="stockTrackAngularJsApp">
 <file name="index.html">
 <md-content>
 <buy-button></buy-button>
 </md-content>
 </file>
 </example>
 */
angular.module('stockTrackAngularJsApp')
  .directive('buyButton', function ($window, $filter, $mdDialog) {
    return {
      scope: {
        symbol: '=',
        user: '='
      },
      templateUrl: 'views/directives/buy-button.html',
      restrict: 'E',
      controller: function($scope) {
        // Create a reference to this scope for the modal
        var _scope = $scope;

        /**
         * @ngdoc function
         * @name buy
         * @methodOf stockTrackAngularJsApp.directive:buy-button
         *
         * @description
         * Buys the selected symbol and quantity
         *
         */
        $scope.buy = function () {
          // Check to see if the User has enough cash to make the trade
          if (($scope.user.availableCash - ($scope.quantity * $scope.symbol.Ask) < 0)) {
            // Alert the User
            $window.alert('Sorry, not enough available cash for this transaction.');
            // Return false to end the function
            return false;
          }
          // Check to see if the Symbol is already in the Positions list
          var isInPositions = $scope.user.Positions.some(function (position) {
            // Return true if the Symbols match
            return position.Symbol.Symbol.toLowerCase() === $scope.symbol.Symbol.toLowerCase();
          });
          // If the Symbol is already in the Positions list then you push to the existing Position
          if (isInPositions) {
            // Loop over the Positions
            angular.forEach($scope.user.Positions, function (position) {
              // Check to see if Symbols match
              if (position.Symbol.Symbol.toLowerCase() === $scope.symbol.Symbol.toLowerCase()) {
                // Push the buy into the Position
                position.buys.push({
                  ask: $scope.symbol.Ask,
                  quantity: $scope.quantity,
                  created: $filter('date')(new Date(), 'medium')
                });
              }
            });
            // The Symbol is not in the Positions list
          } else {
            // Add the new Position to the top of the list
            $scope.user.Positions.unshift({
              Symbol: $scope.symbol,
              symbol: $scope.symbol.Symbol,
              buys: [{
                ask: $scope.symbol.Ask,
                quantity: $scope.quantity,
                created: $filter('date')(new Date(), 'medium')
              }]
            });
          }
          // Update the User's available cash
          $scope.user.availableCash = $scope.user.availableCash - ($scope.quantity * $scope.symbol.Ask);
          // Close the modal window
          $mdDialog.cancel();
        };



        /**
         * @ngdoc function
         * @name openBuyModal
         * @methodOf stockTrackAngularJsApp.directive:buy-button
         *
         * @description
         * Opens the buy modal
         *
         */
        $scope.openBuyModal = function (event) {
          // Open buy modal
          $mdDialog.show({
            controller: ['$scope', function ($scope) {
              // Set a default quantity
              $scope.quantity = 1;
              // Set the Symbol
              $scope.symbol = _scope.symbol;
              // Set the User
              $scope.user = _scope.user;
              // Closes the modal
              $scope.cancel = function () {
                $mdDialog.cancel();
              };
              // Pass through to buy function
              $scope.buy = _scope.buy;
            }],
            templateUrl: 'views/modals/buy.html',
            targetEvent: event
          });
        };
      }
    };
  });
