'use strict';

/**
 * @ngdoc component
 * @name stockTrackAngularJsApp.component:positions
 * @element positions
 * @restrict E
 *
 * @description
 * # positions
 * component to display User Positions.
 *
 * @param {Object} positions User Positions
 */
angular.module('stockTrackAngularJsApp')
  .component('positions', {
      bindings: {
        user: '='
      },
      templateUrl: 'views/components/positions.html',
      restrict: 'E',
      controller: function (SymbolList, Constants, $filter, $scope) {

        var _this = this;

        /**
         * @ngdoc function
         * @name totalPositions
         * @methodOf stockTrackAngularJsApp.component:positions
         *
         * @description
         * Calculates the PNL for the User Positions. If the buy did happen today use the Symbols ask value then
         * use the Symbols previous close value.
         *
         */
        this.totalPositions = function() {
          // Loop over the User Positions
          angular.forEach(this.user.selectedAccount.Positions, function(position) {
            // Set the default values
            var totalQuantity = 0;
            var totalPNL = 0;
            var dailyPNL = 0;
            var totalOriginalValue = 0;
            // Loop over the buys Array
            angular.forEach(position.buys, function (buy) {
              // Add the quantity
              totalQuantity = totalQuantity + buy.quantity;
              // Check that the Symbol Object has been added to the Position
              if(position.Symbol) {
                // Add the total PNL
                totalPNL = totalPNL + (position.Symbol.Ask * buy.quantity) - (buy.ask * buy.quantity);
                // Get today's date
                var todaysDate = new Date();
                // Check to see if the buy happened today and use setHours to take the time out of the comparison
                if(new Date(buy.created).setHours(0,0,0,0) === todaysDate.setHours(0,0,0,0)) {
                  // If the buy did happen today use the Symbols ask value
                  dailyPNL = (position.Symbol.Ask * totalQuantity) - (buy.ask * totalQuantity);
                  buy.dailyPNL = (position.Symbol.Ask * buy.quantity) - (buy.ask * buy.quantity);
                }else {
                  // If the buy did not happen today use the Symbols previous close value
                  dailyPNL = (position.Symbol.Ask * totalQuantity) - (position.Symbol.PreviousClose * totalQuantity);
                  buy.dailyPNL = (position.Symbol.Ask * buy.quantity) - (position.Symbol.PreviousClose * buy.quantity);
                }

                buy.originalValue = (position.Symbol) ? (position.ask * buy.quantity) : 0;
                totalOriginalValue = (position.Symbol) ? totalOriginalValue + buy.originalValue : 0;

                buy.totalPNL = (position.Symbol.Ask * buy.quantity) - (buy.ask * buy.quantity);
                buy.value = (position.Symbol) ? (position.Symbol.Ask * buy.quantity) : 0;
                buy.percentagePNL = (position.Symbol) ? ((buy.value) - (buy.ask * buy.quantity)) * 100 / (buy.ask * buy.quantity) : 0;
              }
            });
            // Set the scope values
            position.totalQuantity = totalQuantity;
            position.totalPNL = totalPNL;
            position.dailyPNL = dailyPNL;
            position.totalValue = (position.Symbol) ? (position.Symbol.Ask * totalQuantity) : 0;
            position.totalOriginalValue = totalOriginalValue;

            // position.percentagePNL = ((buy.value) - (buy.ask * buy.quantity)) * 100 / (buy.ask * buy.quantity);

          });
        };



        /**
         * @ngdoc function
         * @name sortPositions
         * @methodOf stockTrackAngularJsApp.component:positions
         *
         * @description
         * Pass through to the SymbolList.refreshSymbols method.
         *
         */
        this.sortSymbols = function(type) {
          $filter('sortSymbols')(this.user.selectedAccount.Positions, type);
        };



        /**
         * @ngdoc function
         * @name sortPositions
         * @methodOf stockTrackAngularJsApp.component:positions
         *
         * @description
         * Pass through to the SymbolList.refreshSymbols method.
         *
         */
        this.sortPositions = function(type) {
          $filter('sortSymbols')(this.user.selectedAccount.Positions, type);
        };


        /**
         * @ngdoc function
         * @name $watch
         * @eventOf stockTrackAngularJsApp.component:positions
         *
         * @description
         * Watches the User Positions and calls the totalPositions Function.
         *
         */
        $scope.$watch('$ctrl.user.selectedAccount.Positions', function() {
          if(_this.user && _this.user.selectedAccount && _this.user.selectedAccount.Positions) {
            _this.totalPositions();
          }
        }, true);
      }
  });
