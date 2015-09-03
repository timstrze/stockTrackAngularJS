'use strict';

/**
 * @ngdoc overview
 * @name stockTrackAngularJsApp
 * @description
 * # stockTrackAngularJsApp
 *
 * Main module of the application.
 */
angular
  .module('stockTrackAngularJsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngMessages',
    'LocalStorageModule',
    'ngMdIcons'
  ])
  .config(["$routeProvider", "$httpProvider", function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/routes/main.html',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/'
      });

    // Loading Interceptor
    $httpProvider.interceptors.push('LoadingInterceptor');

  }])
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('staja');
  }]);

'use strict';

/**
 * @ngdoc controller
 * @name stockTrackAngularJsApp.controller:MainController
 * @kind function
 *
 * @description
 * # MainController
 * Controller of the stockTrackAngularJsApp
 */

angular.module('stockTrackAngularJsApp')
  .controller('MainController', ["$scope", "$mdSidenav", "Constants", "User", function ($scope, $mdSidenav, Constants, User) {

    // Default Properties
    $scope.showWatchlist = true;
    $scope.showPositions = false;




    /**
     * @ngdoc function
     * @name MainController.init
     * @module main
     * @methodOf stockTrackAngularJsApp.controller:MainController
     * @kind function
     *
     * @description
     * Initiates the application
     *
     */
    $scope.init = function () {
      // Gets the user
      $scope.getUser();
    };



    /**
     * @ngdoc function
     * @name MainController.getUser
     * @module main
     * @methodOf stockTrackAngularJsApp.controller:MainController
     * @kind function
     *
     * @description
     * Gets the User.
     *
     */
    $scope.getUser = function () {
      // Gets the user
      User.http.get({}, function (results) {
        // Creates the User Object and sets the scope variable
        $scope.User = new User(results);
        // Initiates the Symbol list for the watchlist and positions
        $scope.User.initSymbolList().then(function () {
          //* Link the Symbols in the position list to the Symbols in the SymbolList.
          $scope.User.linkPositionSymbols();
          // Set the Symbols in the watch list
          $scope.User.linkWatchlistSymbols();
          // Set the first symbol in the watchlist as the selected symbol
          $scope.User.selectedSymbol = $scope.User.WatchList[0].Symbol;
          //
          var selectedTab = Constants.historicalTabs()[$scope.User.Preferences.selectedHistoricalIndex || 2];
          //
          $scope.User.selectedSymbol.getHistoricalData(selectedTab.startDate, selectedTab.endDate);
        });
      });
    };




    /**
     * @ngdoc function
     * @name MainController.positionsToggle
     * @module main
     * @methodOf stockTrackAngularJsApp.controller:MainController
     * @kind function
     *
     * @description
     * Toggles the Positions side bar.
     *
     */
    $scope.positionsToggle = function () {
      $scope.showWatchlist = false;
      $scope.showPositions = true;
    };




    /**
     * @ngdoc function
     * @name MainController.toggleUserPreferences
     * @module main
     * @methodOf stockTrackAngularJsApp.controller:MainController
     * @kind function
     *
     * @description
     * Toggles the User Preferences Modal.
     *
     */
    $scope.toggleUserPreferences = function () {
      $mdSidenav('user-preferences').toggle();
    };




    /**
     * @ngdoc function
     * @name MainController.watchlistToggle
     * @module main
     * @methodOf stockTrackAngularJsApp.controller:MainController
     * @kind function
     *
     * @description
     * Toggles the Watch List side bar.
     *
     */
    $scope.watchlistToggle = function () {
      $scope.showWatchlist = true;
      $scope.showPositions = false;
    };




    /**
     * @ngdoc function
     * @name MainController.loader_show
     * @module main
     * @eventOf stockTrackAngularJsApp.controller:MainController
     * @kind event
     *
     * @description
     * Watching the loading flag for true.
     *
     */
    $scope.$on('loader_show', function () {
      $scope.isLoading = true;
    });




    /**
     * @ngdoc function
     * @name MainController.loader_hide
     * @module main
     * @eventOf stockTrackAngularJsApp.controller:MainController
     * @kind event
     *
     * @description
     * Watching the loading flag for false.
     *
     */
    $scope.$on('loader_hide', function () {
      $scope.isLoading = false;
    });




    /**
     * @description
     * Initiates the application.
     *
     */
    $scope.init();

  }]);

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
  .directive('buyButton', ["$window", "$filter", "$mdDialog", function ($window, $filter, $mdDialog) {
    return {
      scope: {
        symbol: '=',
        user: '='
      },
      templateUrl: 'views/directives/buy-button.html',
      restrict: 'E',
      controller: ["$scope", function($scope) {
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
            templateUrl: 'views/directives/modals/buy.html',
            targetEvent: event
          });
        };
      }]
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:color-number
 * @element div
 * @function
 *
 * @description
 * Resize textarea automatically to the size of its text content.
 *
 */
angular.module('stockTrackAngularJsApp')
  .directive('colorNumber', function () {
    return {
      scope: {
        number: '='
      },
      templateUrl: 'views/directives/color-number.html',
      restrict: 'E'
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:line-chart
 * @description
 * # lineChart
 */

/*global d3 */

angular.module('stockTrackAngularJsApp')
  .directive('lineChart', ["$window", function ($window) {
    return {
      scope: {
        historicalData: '='
      },
      restrict: 'E',
      link: function postLink(scope, element) {
        //var margin, width, height, x, y, xAxis, yAxis;
        //
        //margin = {top: 20, right: 20, bottom: 30, left: 50};
        //
        var parseDate = d3.time.format('%Y-%m-%d').parse;
        //
        //var line = d3.svg.line();
        //var svg = d3.select(element[0]).append('svg');
        //
        //var theXAxis = svg.append('g')
        //  .attr('class', 'x axis');
        //
        //var theYAxis = svg.append('g')
        //  .attr('class', 'y axis');
        //
        //var priceText = theYAxis
        //  .append('text')
        //  .attr('transform', 'rotate(-90)')
        //  .attr('y', 6)
        //  .attr('dy', '.71em')
        //  .style('text-anchor', 'end')
        //  .text('Price ($)');
        //
        //var theLines = svg.append('path')
        //  .attr('class', 'line');

        //var svg = d3.select('body').append('svg')

        var render = function () {

          if (!scope.historicalData) {
            return false;
          }

          //width = element.parent()[0].offsetWidth - margin.left - margin.right;
          //height = element.parent()[0].offsetHeight - margin.top - margin.bottom;


          var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = element.parent()[0].offsetWidth - margin.left - margin.right,
            height = element.parent()[0].offsetHeight - margin.top - margin.bottom;

          var x = d3.time.scale()
            .range([0, width]);

          var y = d3.scale.linear()
            .range([height, 0]);

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

          var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

          var line = d3.svg.line()
            .x(function (d) {
              return x(d.date);
            })
            .y(function (d) {
              return y(d.close);
            });

          d3.select(element[0]).selectAll('*').remove();
          //var svg = d3.select(element[0]).append('svg');

          var svg = d3.select(element[0]).append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          scope.historicalData.forEach(function (d) {
            d.date = parseDate(d.Date);
            d.close = +d.Close;
          });

          x.domain(d3.extent(scope.historicalData, function (d) {
            return d.date;
          }));
          y.domain(d3.extent(scope.historicalData, function (d) {
            return d.close;
          }));

          svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

          svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Price ($)');

          svg.append('path')
            .datum(scope.historicalData)
            .attr('class', 'line')
            .attr('d', line);

        };


        scope.$watch('historicalData', function () {
          render();
        }, true);


        angular.element($window).on('resize', function () {
          render();
        });

      }
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:positions
 * @description
 * # positions
 */
angular.module('stockTrackAngularJsApp')
  .directive('positions', ["SymbolList", function (SymbolList) {
    return {
      scope: {
        positions: '='
      },
      templateUrl: 'views/directives/positions.html',
      restrict: 'E',
      controller: ["$scope", function ($scope) {

        var totalPositions = function() {
          angular.forEach($scope.positions, function(position) {

            var totalQuantity = 0;
            var totalPNL = 0;
            var dailyPNL = 0;

            angular.forEach(position.buys, function (buy) {
              totalQuantity = totalQuantity + buy.quantity;
              if(position.Symbol) {
                totalPNL = totalPNL + (position.Symbol.Ask * buy.quantity) - (buy.ask * buy.quantity);

                //Get today's date
                var todaysDate = new Date();

                //call setHours to take the time out of the comparison
                if(new Date(buy.created).setHours(0,0,0,0) === todaysDate.setHours(0,0,0,0)) {
                  //Date equals today's date
                  dailyPNL = (position.Symbol.Ask * totalQuantity) - (buy.ask * totalQuantity);
                }else {
                  dailyPNL = (position.Symbol.Ask * totalQuantity) - (position.Symbol.PreviousClose * totalQuantity);
                }
              }
            });

            position.totalQuantity = totalQuantity;
            position.totalPNL = totalPNL;
            position.dailyPNL = dailyPNL;
            position.totalValue = (position.Symbol) ? (position.Symbol.Ask * totalQuantity) : 0;

          });
        };


        $scope.refreshSymbols = function() {
          SymbolList.refreshSymbols();
        };

        $scope.$watch('positions', function() {
          if($scope.positions) {
            totalPositions();
          }
        }, true);
      }]
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:sell-button
 * @description
 * # sellButton
 */
angular.module('stockTrackAngularJsApp')
  .directive('sellButton', function () {
    return {
      scope: {
        symbol: '=',
        user: '='
      },
      templateUrl: 'views/directives/sell-button.html',
      restrict: 'E',
      controller: ["$scope", "$log", function($scope, $log) {


        /**
         * @ngdoc function
         * @name openSellModal
         * @methodOf stockTrackAngularJsApp.directive:sell-button
         *
         * @description
         * Opens the sell modal
         *
         */
        $scope.openSellModal = function (event) {
          $log.debug('sell', event);
        };

      }]
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:spark-line
 * @description
 * # sparkLine
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
        // create an SVG element inside the #graph div that fills 100% of the div
        var graph, data, line;
//        var max=0, min=0, len= 0, p=2;


        var width = element.parent().prop('offsetWidth');
        var height = 40;
        // X scale will fit values from 0-10 within pixels 0-100
        var x;
//        var x = d3.scale.linear().domain([0, 10]).range([0, 50]);
        // Y scale will fit values from 0-10 within pixels 0-100
//        var y = d3.scale.linear().domain([0, 10]).range([0, 30]);
        // create a line object that represents the SVN line we're creating

        var y;

//        var x = d3.scale.linear().range([0, width]);
//        var y = d3.scale.linear().range([height, 0]);

        var animate = function (askHistory) {
//
//          for(var ask in askHistory) {
//            min = d3.min([d3.min(askHistory[ask]), min]);
//            max = d3.max([d3.max(askHistory[ask]), max]);
//            len = d3.max([askHistory[ask].length, len]);
//          }

          element.find('div').empty();
          // create an SVG element inside the #graph div that fills 100% of the div
          graph = d3.select(element[0].querySelector('.spark-line')).append('svg:svg').attr('width', '100%').attr('height', '40px').attr('style', 'padding-top:9px');
          // create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
          data = askHistory;

          x = d3.scale.linear().domain([0, askHistory.length]).range([0, width]);


//          x = d3.scale.linear().domain([0, len]).range([p, width - p]);
//          y = d3.scale.linear().domain([min, max]).range([height - p, p]);

//          x = d3.scale.ordinal()
//            .domain(dataset.map(function(d) { return d.QYear; }))
//            .rangeRoundBands([0, width], .04);
//
//          y = d3.scale.linear()
//            .domain([0, d3.max(data)])
//            .range([height, 0]);

          y = d3.scale.linear().domain([d3.min(askHistory), d3.max(askHistory)]).range([0 , height-15]);

          // create a line object that represents the SVN line we're creating
          line = d3.svg.line()
            // assign the X function to plot our line as we wish
            .x(function (d, i) {
              // verbose logging to show what's actually being done
              //console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
              // return the X coordinate where we want to plot this datapoint
              return x(i);
            })
            .y(function (d) {
              // verbose logging to show what's actually being done
              //console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + ' using our yScale.');
              // return the Y coordinate where we want to plot this datapoint
              return y(d);
            });

          // display the line by appending an svg:path element with the data line we created above
          graph.append('svg:path').attr('d', line(data));
        };


        $scope.$watch('askHistory', function() {
          if($scope.askHistory && $scope.askHistory.length) {
            animate($scope.askHistory);
          }
        }, true);


      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:user-preferences
 * @description
 * # userPreferences
 */
angular.module('stockTrackAngularJsApp')
  .directive('userPreferences', ["$interval", "SymbolList", function ($interval, SymbolList) {
    return {
      scope: {
        user: '='
      },
      templateUrl: 'views/directives/user-preferences.html',
      restrict: 'E',
      controller: ["$scope", function($scope) {

        $scope.symbolRefreshChange = function() {
          $interval.cancel(SymbolList.interval);

          if($scope.user.Preferences.refreshState) {
            SymbolList.interval = $interval( function(){ SymbolList.refreshSymbols(); }, $scope.user.Preferences.refreshRate);
          }

        };

      }]
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:user-totals
 * @description
 * # userTotals
 */
angular.module('stockTrackAngularJsApp')
  .directive('userTotals', function () {
    return {
      scope: {
        user: '='
      },
      templateUrl: 'views/directives/user-totals.html',
      restrict: 'E',
      controller: ["$scope", function($scope) {

        var calculateTotals = function() {
          var dailyPNL = 0;
          var totalPNL = 0;
          var totalValue = 0;

          angular.forEach($scope.user.Positions, function(position) {
            totalPNL = totalPNL + position.totalPNL;
            dailyPNL = dailyPNL + position.dailyPNL;
            totalValue = totalValue + position.totalValue;
          });

          $scope.dailyPNL = dailyPNL;
          $scope.totalPNL = totalPNL;
          $scope.totalValue = totalValue;
        };

        $scope.$watch('user.Positions', function() {
          if($scope.user && $scope.user.Positions) {
            calculateTotals();
          }
        }, true);

      }]
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:watch-list-details
 * @element div
 * @function
 *
 * @description
 * Display the selected symbol's details and graphs.
 *
 * @param {Object} symbol Symbol Object
 * @param {Object} user User Object
 *
 */
angular.module('stockTrackAngularJsApp')
  .directive('watchListDetails', ["$mdDialog", "SymbolList", "$mdSidenav", "Constants", function ($mdDialog, SymbolList, $mdSidenav, Constants) {
    return {
      restrict: 'E',
      scope: {
        symbol: '=',
        user: '='
      },
      templateUrl: 'views/directives/watch-list-details.html',
      controller: ["$scope", function ($scope) {

        // Make service available to the template
        $scope.Constants = Constants;

        /**
         * @ngdoc function
         * @name removeFromWatchlist
         * @methodOf stockTrackAngularJsApp.directive:watch-list-details
         *
         * @description
         * Confirms if the user wants to remove a Symbol from the watchlist
         *
         * @param {Object} symbol Symbol Object
         * @param {Event} event Button click event
         *
         */
        $scope.removeFromWatchlist = function (symbol, event) {
          // Build confirm object
          var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('Remove from watch list')
            .content('Would you like to remove ' + symbol.Symbol + ' from your watch list?')
            .ariaLabel('Remove from watchlist?')
            .ok('Remove')
            .cancel('Keep')
            .targetEvent(event);
          // Display the confirm window
          $mdDialog.show(confirm).then(function () {
            // Remove the Symbol if it is not in Positions
            SymbolList.removeSymbol(symbol);
            // Find the index of the Symbol in the watch list
            var index = $scope.user.WatchList.map(function (wlSymbol) {
              return wlSymbol.Symbol;
            }).indexOf(symbol);
            // Remove the Symbol from the watch list
            $scope.user.WatchList.splice(index, 1);
            // Set the selected symbol from the first watch list item
            $scope.user.selectedSymbol = $scope.user.WatchList[0].Symbol;
          });
        };

        /**
         * @ngdoc function
         * @name toggleWatchlist
         * @methodOf stockTrackAngularJsApp.directive:watch-list-details
         *
         * @description
         * Toggle the watch list
         *
         */
        $scope.toggleWatchlist = function () {
          // Toggle the watch list
          $mdSidenav('watch-list').toggle();
        };

      }]
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name stockTrackAngularJsApp.directive:watch-list
 * @description
 * # watchList
 */
angular.module('stockTrackAngularJsApp')
  .directive('watchList', ["Symbol", "Constants", "localStorageService", "$mdSidenav", "SymbolList", function (Symbol, Constants, localStorageService, $mdSidenav, SymbolList) {
    return {
      scope: {
//        savedSymbols: '=',
        watchList: '=',
        preferences: '=',
        selectedSymbol: '='
      },
      templateUrl: 'views/directives/watch-list.html',
      restrict: 'E',
      controller: ["$scope", function ($scope) {

        $scope.closeWatchlist = function () {
          $mdSidenav('watch-list').close();
        };

        $scope.search = function (searchVal) {
          if (searchVal && searchVal.length > 0) {
            return Symbol.http.search({searchVal: searchVal}).$promise.then(function (data) {
              var quote = data.query.results.quote;
              quote.value = quote.Name;
              quote.display = quote.Name;

              return (data.query.results.quote.Ask) ? [quote] : [];
            });
          } else {
            return [];
          }
        };

        $scope.refreshSymbols = function() {
          SymbolList.refreshSymbols();
        };

        $scope.chooseSymbol = function (item) {
          if (item) {
            $scope.searchText = '';

            // Check for duplicate entries
            if($scope.watchList.some(function(wlItem) {return wlItem.symbol.toLowerCase() === item.symbol.toLowerCase();})) {
              return false;
            }

            // Add new symbol to the symbol list
            $scope.watchList.unshift({
              symbol: item.symbol,
              Symbol: SymbolList.addSymbol(item)
            });

//            localStorageService.set('WatchList', $scope.watchList);

            $scope.selectSymbol($scope.watchList[0].Symbol);
          }
        };

        $scope.selectSymbol = function (symbol) {

          $scope.selectedSymbol = symbol;

//          $scope.preferences.lastSelectedSymbol = $scope.selectedSymbol;

//          var selectedTab = Constants.historicalTabs()[$scope.preferences.selectedHistoricalIndex];
//
//          symbol.getHistoricalData(selectedTab.startDate, selectedTab.endDate);

//          localStorageService.set('preferences', $scope.preferences);
        };

      }]
    };
  }]);

'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.service:Constants
 * @description
 * # Constants
 * Contains various properties and methods for the app.
 *
 */
angular.module('stockTrackAngularJsApp')
  .factory('Constants', function () {

    var Constants = {};


    /**
     * @ngdoc function
     * @name Constants.getDate
     * @methodOf stockTrackAngularJsApp.service:Constants
     *
     * @description
     * Takes in a javascript date and returns it formatted as 'YYYY-MM-DD'
     *
     * @param {String} day Example string: Mon Aug 31 2015 12:10:38 GMT-0500 (CDT)
     *
     * @returns {String} date formatted as 'YYYY-MM-DD' Example: 2015-08-31
     */
    Constants.getDate = function (day) {
      // Get the day as an integer: 31
      var dd = day.getDate();
      // Get the month as mm: January is 0
      var mm = day.getMonth() + 1;
      // Get year as yyyy: 2015
      var yyyy = day.getFullYear();
      // Make the day a two digit integer if not
      if (dd < 10) {
        dd = '0' + dd;
      }
      // Make the month a two digit integer if not
      if (mm < 10) {
        mm = '0' + mm;
      }
      // Return the date as 2015-08-31
      return yyyy + '-' + mm + '-' + dd;
    };


    /**
     * @ngdoc function
     * @name Constants.fiveDaysFromtoday
     * @propertyOf stockTrackAngularJsApp.service:Constants
     *
     * @description
     * Returns a string formatted as Wed Aug 26 2015 12:18:00 GMT-0500 (CDT)
     *
     * @returns {String} date formatted as Wed Aug 26 2015 12:18:00 GMT-0500 (CDT)
     *
     */
    Constants.fiveDaysFromtoday = new Date(new Date().setDate(new Date().getDate() - 5));



    /**
     * @ngdoc function
     * @name Constants.oneMonthFromtoday
     * @propertyOf stockTrackAngularJsApp.service:Constants
     *
     * @description
     * Returns a string formatted as Fri Jul 31 2015 12:18:00 GMT-0500 (CDT)
     *
     * @returns {String} date formatted as Fri Jul 31 2015 12:18:00 GMT-0500 (CDT)
     *
     */
    Constants.oneMonthFromtoday = new Date(new Date().setMonth(new Date().getMonth() - 1));


    /**
     * @ngdoc function
     * @name Constants.oneYearFromtoday
     * @propertyOf stockTrackAngularJsApp.service:Constants
     *
     * @description
     * Returns a string formatted as Sun Aug 31 2014 12:18:00 GMT-0500 (CDT)
     *
     * @returns {String} date formatted as Sun Aug 31 2014 12:18:00 GMT-0500 (CDT)
     *
     */
    Constants.oneYearFromtoday = new Date(new Date().setFullYear(new Date().getFullYear() - 1));


    /**
     * @ngdoc function
     * @name Constants.sixMonthsFromtoday
     * @propertyOf stockTrackAngularJsApp.service:Constants
     *
     * @description
     * Returns a string formatted as Tue Mar 03 2015 12:18:00 GMT-0600 (CST)
     *
     * @returns {String} date formatted as Tue Mar 03 2015 12:18:00 GMT-0600 (CST)
     *
     */
    Constants.sixMonthsFromtoday = new Date(new Date().setMonth(new Date().getMonth() - 6));


    /**
     * @ngdoc function
     * @name Constants.threeMonthsFromtoday
     * @propertyOf stockTrackAngularJsApp.service:Constants
     *
     * @description
     * Returns a string formatted as Sun May 31 2015 12:18:00 GMT-0500 (CDT)
     *
     * @returns {String} date formatted as Sun May 31 2015 12:18:00 GMT-0500 (CDT)
     *
     */
    Constants.threeMonthsFromtoday = new Date(new Date().setMonth(new Date().getMonth() - 3));


    /**
     * @ngdoc function
     * @name Constants.today
     * @propertyOf stockTrackAngularJsApp.service:Constants
     *
     * @description
     * Returns a string formatted as Mon Aug 31 2015 12:18:00 GMT-0500 (CDT)
     *
     * @returns {String} date formatted as Wed Mon Aug 31 2015 12:18:00 GMT-0500 (CDT)
     *
     */
    Constants.today = new Date();


    /**
     * @ngdoc function
     * @name Constants.historicalTabs
     * @propertyOf stockTrackAngularJsApp.service:Constants
     *
     * @description
     * Array of default historical data for tabs
     *
     * @returns {Array} Returns and
     *
     */
    Constants.historicalTabs = function() {
      return [
        {
          title: '5 Day',
          slug: '5-day',
          endDate: Constants.getDate(Constants.today),
          startDate: Constants.getDate(Constants.fiveDaysFromtoday)
        },
        {
          title: '1 Month',
          slug: '1-month',
          endDate: Constants.getDate(Constants.today),
          startDate: Constants.getDate(Constants.oneMonthFromtoday)
        },
        {
          title: '3 Month',
          slug: '3-month',
          endDate: Constants.getDate(Constants.today),
          startDate: Constants.getDate(Constants.threeMonthsFromtoday)
        },
        {
          title: '6 Month',
          slug: '6-month',
          endDate: Constants.getDate(Constants.today),
          startDate: Constants.getDate(Constants.sixMonthsFromtoday)
        },
        {
          title: '1 Year',
          slug: '1-year',
          endDate: Constants.getDate(Constants.today),
          startDate: Constants.getDate(Constants.oneYearFromtoday)
        }
      ];
    };


    return Constants;

  });

'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.service:LoadingInterceptor
 * @description
 * # LoadingInterceptor
 * Factory to broadcast the loading message to the app.
 */
angular.module('stockTrackAngularJsApp')
  .factory('LoadingInterceptor', ["$rootScope", "$q", function ($rootScope, $q) {

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
  }]);

'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.Position
 * @description
 * # position
 * Factory in the stockTrackAngularJsApp.
 */
angular.module('stockTrackAngularJsApp')
  .factory('Position', function () {

    var Position = function (properties) {
      // Create a reference to this
      var _this = this;
      // Loop over the keys of the object passed in
      Object.keys(properties).forEach(function (property) {
        // Set the properties of this Symbol
        _this[property] = properties[property];
      });
    };

    return Position;

  });

'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.service:SymbolList
 * @description
 * # SymbolList
 * Gets all Symbols from the User.WatchList and User.Positions. All Symbols should be cloned from this list.
 */

angular.module('stockTrackAngularJsApp')
  .factory('SymbolList', ["Symbol", "$interval", "$filter", "$log", function (Symbol, $interval, $filter, $log) {

    return {


      /**
       * @ngdoc function
       * @name SymbolList.Symbols
       * @propertyOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Symbol objects that all Symbol data is referenced
       *
       * @returns {Array} Returns an array of Symbol Objects
       *
       */
      Symbols: [],


      /**
       * @ngdoc function
       * @name SymbolList.WatchList
       * @propertyOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Reference to User.WatchList
       *
       * @returns {Array} Returns a reference to User.WatchList
       *
       */
      WatchList: [],


      /**
       * @ngdoc function
       * @name SymbolList.Positions
       * @propertyOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Reference to User.Positions
       *
       * @returns {Array} Returns a reference to User.Positions
       *
       */
      Positions: [],


      /**
       * @ngdoc function
       * @name SymbolList.Preferences
       * @propertyOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Reference to User.Preferences
       *
       * @returns {Object} Returns a reference to User.Preferences
       *
       */
      Preferences: {},



      /**
       * @ngdoc function
       * @name SymbolList.addSymbol
       * @methodOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Adds a Symbol to the SymbolList.Symbols array if it is not already added.
       *
       * @param {Object} item Symbol to be added to the SymbolList.Symbols array
       *
       * @returns {Object} Returns the new Symbol
       */
      addSymbol: function(item) {
        // Save a reference to the Symbol
        var dupSymbol = this.Symbols.filter(function(symbol) {return symbol.Symbol.toLowerCase() === item.Symbol.toLowerCase();});
        // Make sure the symbol isn't already in the list
        if(dupSymbol.length > 0) {
          // Return the Symbol
          return dupSymbol[0];
        }else{
          // https://jslinterrors.com/do-not-use-a-as-a-constructor
          var SSymbol = Symbol;
          // Create a new Symbol and save a reference to return
          var newSymbol = new SSymbol(item);
          // Add the new symbol to the SymbolList.Symbols array
          this.Symbols.push(newSymbol);
          // Return the new Symbol
          return newSymbol;
        }
      },




      /**
       * @ngdoc function
       * @name SymbolList.init
       * @methodOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Creates the SymbolList from the watchlist and positions passed in from a User.
       *
       * @param {Array} watchList WatchList from the User
       * @param {Array} positions Positions from the User
       * @param {Object} preferences Preferences from the User
       *
       */
      init: function(watchList, positions, preferences) {
        // Store a reference to this
        var _this = this;
        // Add a reference to User.WatchList
        this.WatchList = watchList;
        // Add a reference to User.Positions
        this.Positions = positions;
        // Add a reference to User.Preferences
        this.Preferences = preferences;
        // Create an array of only the Symbol symbols ['wfm', 'aapl', 'dis']
        var wl = watchList.map(function(item) {return item.symbol.toLowerCase();});
        // Create an array of only the Symbol symbols ['wfm', 'aapl', 'dis']
        var ps = positions.map(function(item) {return item.symbol.toLowerCase();});
        // Concat the two lists together
        var sList = wl.concat(ps.filter(function (item) {
          // Remove any duplicates
          return wl.indexOf(item) < 0;
        }));
        // Get the Symbol details
        return Symbol.http.all({list: sList}).$promise.then(function (data) {
          return _this.setInitialSymbols(data);
        });
      },



      /**
       * @ngdoc function
       * @name SymbolList.refreshSymbols
       * @methodOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Refreshes the SymbolList properties so the angular bindings update.
       *
       */
      refreshSymbols: function() {
        // Store a reference to this
        var _this = this;
        // Get all the Symbols by name ['wfm', 'aapl', 'dis']
        Symbol.http.all({list: this.Symbols.map(function(item) {return item.symbol.toLowerCase();})}).$promise.then(function (data) {
          // Check to see results came back
          if(data.query.results) {
            // Loop over the results
            angular.forEach(data.query.results.quote, function (quote, index) {
              // Only save the last fifty asks
              if(_this.Symbols[index].askHistory.length > 50) {
                // Remove the first item in the array
                _this.Symbols[index].askHistory.shift();
              }
              // Add the ask to the ask history array
              _this.Symbols[index].askHistory.push(quote.Ask);
              // Loop over the properties of the Symbol
              Object.keys(quote).forEach(function (property) {
                // Overwrite Symbol properties with the new values
                _this.Symbols[index][property] = quote[property];
              });
            });
          }
        });
        // Log Refresh Status
        $log.debug('Refreshing Symbols: ' + $filter('date')(new Date(), 'medium'));
      },




      /**
       * @ngdoc function
       * @name SymbolList.removeSymbol
       * @methodOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Removes the Symbol from the SymbolList.Symbols array if it is not also in User.Positions
       *
       * @param {Object} item Symbol to be removed from the SymbolList.Symbols array
       *
       * @returns {Array} Returns the SymbolList.Symbols
       */
      removeSymbol: function(item) {
        // Check to see if the Symbol is in User.Positions.
        var isInPositions = this.Positions.some(function(position) {
          // Check to see if the symbols match
          return item.symbol.toLowerCase() === position.symbol.toLowerCase();
        });
        // Keep the Symbol if it is in User.Positions
        if(!isInPositions) {
          // Remove the Symbol from the list
          this.Symbols.splice(this.Symbols.indexOf(item), 1);
        }
        // Return the SymbolList.Symbols
        return this.Symbols;
      },




      /**
       * @ngdoc function
       * @name SymbolList.setInitialSymbols
       * @methodOf stockTrackAngularJsApp.service:SymbolList
       *
       * @description
       * Creates the SymbolList from the watchlist and positions passed in from a User.
       *
       * @param {Object} data Results from the call to get Symbol Data
       *
       * @returns {Array} Returns SymbolList.Symbols fully fleshed out
       *
       */
      setInitialSymbols: function(data) {
        // Create a temp array
        var tmpSymbolList = [];
        // Make sure there are results
        if(data && data.query && data.query.results) {
          // Loop over the results
          angular.forEach(data.query.results.quote, function (quote) {
            // https://jslinterrors.com/do-not-use-a-as-a-constructor
            var SSymbol = Symbol;
            // Create a new Symbol
            var symbol = new SSymbol(quote);
            // Add the Ask to the Ask History array
            symbol.askHistory.push(quote.Ask);
            // Add the Symbol to the temp array
            tmpSymbolList.push(symbol);
          });
          // Check if the User wants to auto-refresh Symbols
          if(this.Preferences.refreshState) {
            // Start refreshing the SymbolList and store the reference
            this.interval = $interval( function(){ this.refreshSymbols(); }, this.Preferences.refreshRate);
          }
        }
        // Set the SymbolList.Symbols from the temp array
        this.Symbols = tmpSymbolList;
        // Return the SymbolList.Symbols
        return this.Symbols;
      }
    };
  }]);

'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.service:Symbol
 * @description
 * # Symbol
 * Factory Object for Symbols containing properties and methods.
 */
angular.module('stockTrackAngularJsApp')
  .factory('Symbol', ["$resource", function ($resource) {

    var Symbol = function (properties) {
      // Create a reference to this
      var _this = this;
      // Loop over the keys of the object passed in
      Object.keys(properties).forEach(function (property) {
        // Set the properties of this Symbol
        _this[property] = properties[property];
      });
      // Create an empty array to hold the ask history
      this.askHistory = [];
    };




    /**
     * @ngdoc function
     * @name Symbol.getHistoricalData
     * @methodOf stockTrackAngularJsApp.service:Symbol
     *
     * @description
     * Gets the historical data that the graphs need.
     *
     * @param {String} startDate A starting date formatted "2015-08-31"
     * @param {String} endDate A starting date formatted "2015-08-31"
     *
     */
    Symbol.prototype.getHistoricalData = function (startDate, endDate) {
      // Store a reference to this
      var _this = this;
      // Get the historical data by symbol, start date, and end date
      this.http.details({
        // Example: aapl
        symbol: this.Symbol,
        // Example: "2015-05-31"
        startDate: startDate,
        // Example: "2015-08-31"
        endDate: endDate
      }).$promise.then(function (results) {
        // Set the historical data on the Symbol
        _this.historicalData = results.query.results.quote;
      });
    };





    /**
     * @ngdoc function
     * @name Symbol.http
     * @methodOf stockTrackAngularJsApp.service:Symbol
     *
     *
     * @description
     * Public access to the GET, PUT, and POST methods
     *
     * @param {String} ID of program version
     *
     */
    Symbol.http = $resource('http://query.yahooapis.com/v1/public/yql', {
    }, {
      search: {
        method: 'GET',
        url: 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quotes where symbol in (":searchVal")',
        params: {
          format: 'json',
          env: 'store://datatables.org/alltableswithkeys'
        }
      },
      all: {
        method: 'GET',
        url: 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quotes where symbol in (":list")',
        params: {
          format: 'json',
          env: 'store://datatables.org/alltableswithkeys'
        }
      }
    });






    /**
     * @ngdoc function
     * @name Symbol.prototype.http
     * @methodOf stockTrackAngularJsApp.service:Symbol
     *
     *
     * @description
     * Private access to the GET, PUT, and POST methods
     *
     * @param {String} ID of program version
     *
     */
    Symbol.prototype.http = $resource('http://query.yahooapis.com/v1/public/yql', {
    }, {
      details: {
        method: 'GET',
        url: 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.historicaldata where symbol = ":symbol" and startDate = ":startDate" and endDate = ":endDate"',
        params: {
          format: 'json',
          env: 'store://datatables.org/alltableswithkeys'
        }
      }
    });


    return Symbol;

  }]);

'use strict';

/**
 * @ngdoc service
 * @name stockTrackAngularJsApp.service:User
 * @description
 * # User
 * User service that contains all the properties and methods for a user
 *
 */
angular.module('stockTrackAngularJsApp')
  .factory('User', ["$resource", "Constants", "Symbol", "SymbolList", function ($resource, Constants, Symbol, SymbolList) {


    var User = function (properties) {
      var _this = this;
      Object.keys(properties).forEach(function (property) {
        _this[property] = properties[property];
      });
    };




    /**
     * @ngdoc function
     * @name User.http
     * @methodOf stockTrackAngularJsApp.service:User
     *
     * @description
     * Public access to the GET, PUT, and POST methods
     *
     * @param {String} ID of program version
     */
    User.http = $resource('json/user.json/:id', {
      id: '@id'
    }, {
      get: {
        method: 'GET'
      }
    });



    /**
     * @ngdoc function
     * @name User.initSymbolList
     * @methodOf stockTrackAngularJsApp.service:User
     *
     * @description
     * Create the initial Symbol List from the User's watch list and position list.
     *
     * @return {Promise} Returns the promise from getting all the Symbol data
     */
    User.prototype.initSymbolList = function () {
      // Create the initial Symbol List from the User's watch list and position list
      return SymbolList.init(this.WatchList, this.Positions, this.Preferences);
    };



    /**
     * @ngdoc function
     * @name User.linkPositionSymbols
     * @methodOf stockTrackAngularJsApp.service:User
     *
     * @description
     * Link the Symbols in the User.Positions to the Symbols in the SymbolList.
     *
     */
    User.prototype.linkPositionSymbols = function () {
      // Reference the Symbols in the SymbolList
      var symbols = SymbolList.Symbols;
      // Loop through the User.Positions
      angular.forEach(this.Positions, function(position) {
        // Loops through the SymbolList
        angular.forEach(symbols, function(smbl) {
          // Check if Symbols match
          if(smbl.symbol.toLowerCase() === position.symbol.toLowerCase()) {
            // Link the Symbol in the User.Position list to the SymbolList
            position.Symbol = smbl;
          }
        });
      });
    };



    /**
     * @ngdoc function
     * @name User.linkWatchlistSymbols
     * @methodOf stockTrackAngularJsApp.service:User
     *
     * @description
     * Link the Symbols in the User.WatchList to the Symbols in the SymbolList.
     *
     */
    User.prototype.linkWatchlistSymbols = function () {
      // Reference the Symbols in the SymbolList
      var symbols = SymbolList.Symbols;
      // Loop through the User.WatchList
      angular.forEach(this.WatchList, function(watchList) {
        // Loops through the SymbolList
        angular.forEach(symbols, function(smbl) {
          // Check if Symbols match
          if(smbl.symbol.toLowerCase() === watchList.symbol.toLowerCase()) {
            // Link the Symbol in the User.WatchList to the SymbolList
            watchList.Symbol = smbl;
          }
        });
      });
    };

    return User;

  }]);
