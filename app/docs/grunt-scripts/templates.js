angular.module('stockTrackAngularJsApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/buy-button.html',
    "<div class=\"buy-button\">\n" +
    "  <md-button class=\"md-secondary\" aria-label=\"Buy\" ng-click=\"openBuyModal($event)\">\n" +
    "    Buy\n" +
    "  </md-button>\n" +
    "</div>\n"
  );


  $templateCache.put('views/directives/color-number.html',
    "<span ng-class=\"{positive: number.indexOf('+') > -1, negative: number.indexOf('-') > -1}\">\n" +
    "  {{number}}\n" +
    "</span>\n"
  );


  $templateCache.put('views/directives/modals/buy.html',
    "<md-dialog aria-label=\"{{symbol.Name}}\" class=\"modal-buy\">\n" +
    "    <form>\n" +
    "        <md-toolbar>\n" +
    "            <div class=\"md-toolbar-tools\">\n" +
    "                <h2>Buy\n" +
    "                  <span style=\"text-transform: uppercase;\">\n" +
    "                    {{symbol.Symbol}}:\n" +
    "                  </span>\n" +
    "                  <span ng-class=\"{positive: symbol.Change.indexOf('+') > -1, negative: symbol.Change.indexOf('-') > -1}\">\n" +
    "                    {{symbol.Ask}} {{symbol.Change}} ({{symbol.ChangeinPercent}})\n" +
    "                  </span>\n" +
    "                </h2>\n" +
    "                <span flex></span>\n" +
    "                <md-button class=\"md-icon-button\" ng-click=\"cancel()\">\n" +
    "                    <ng-md-icon icon=\"remove_circle_outline\" size=\"20\" style=\"fill:#fff;\"\n" +
    "                                aria-label=\"Close dialog\"></ng-md-icon>\n" +
    "                </md-button>\n" +
    "            </div>\n" +
    "        </md-toolbar>\n" +
    "        <md-dialog-content>\n" +
    "\n" +
    "          <md-list>\n" +
    "              <md-list-item class=\"md-2-line\">\n" +
    "                  <div class=\"md-list-item-text\">\n" +
    "                    <h3>Ask: <span>{{symbol.Ask | currency}}</span></h3>\n" +
    "\n" +
    "                    <h4>Available Cash: <span>{{user.availableCash | currency}}</span></h4>\n" +
    "\n" +
    "                    <form name=\"buy\">\n" +
    "                      <md-input-container>\n" +
    "                        <label>Quantity</label>\n" +
    "                        <input required type=\"number\" step=\"any\" name=\"quantity\" ng-model=\"quantity\" min=\"1\" max=\"9999999\">\n" +
    "                        <div ng-messages=\"buy.quantity.$error\">\n" +
    "                          <div ng-message=\"required\">You've got to charge something! You can't just <b>give away</b> a Missile Defense System.</div>\n" +
    "                          <div ng-message=\"min\">You should charge at least $800 an hour. This job is a big deal... if you mess up, everyone dies!</div>\n" +
    "                          <div ng-message=\"max\">$5,000 an hour? That's a little ridiculous. I doubt event Bill Clinton could afford that.</div>\n" +
    "                        </div>\n" +
    "                      </md-input-container>\n" +
    "                    </form>\n" +
    "\n" +
    "                    <p>Buy {{quantity}} shares of {{symbol.Symbol}} at {{symbol.Ask | currency}} a share for <b>{{quantity * symbol.Ask | currency}}</b></p>\n" +
    "                    <p>You will have {{user.availableCash -(quantity * symbol.Ask) | currency}} in remaining cash.</p>\n" +
    "                  </div>\n" +
    "              </md-list-item>\n" +
    "          </md-list>\n" +
    "\n" +
    "        </md-dialog-content>\n" +
    "        <div class=\"md-actions\" layout=\"row\">\n" +
    "            <span flex></span>\n" +
    "            <md-button ng-click=\"cancel()\" class=\"md-primary\">\n" +
    "                Cancel\n" +
    "            </md-button>\n" +
    "            <md-button ng-click=\"buy()\" class=\"md-primary\">\n" +
    "                Buy\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</md-dialog>\n"
  );


  $templateCache.put('views/directives/positions.html',
    "<div class=\"positions\">\n" +
    "  <md-toolbar>\n" +
    "    <div class=\"md-toolbar-tools\">\n" +
    "      <h2>\n" +
    "        Positions ({{positions.length}})\n" +
    "      </h2>\n" +
    "      <span flex></span>\n" +
    "      <md-button class=\"md-icon-button\" aria-label=\"Refresh\" ng-click=\"refreshSymbols()\">\n" +
    "        <ng-md-icon icon=\"refresh\" style=\"fill: #fff\" size=\"22\"></ng-md-icon>\n" +
    "      </md-button>\n" +
    "    </div>\n" +
    "  </md-toolbar>\n" +
    "\n" +
    "  <md-content>\n" +
    "    <md-button ng-click=\"closePositions()\" class=\"md-primary\" hide-gt-md>\n" +
    "      Close Positions\n" +
    "    </md-button>\n" +
    "\n" +
    "    <form ng-submit=\"$event.preventDefault()\">\n" +
    "      <md-input-container flex style=\"padding-bottom: 0;\">\n" +
    "        <label>Filter Positions</label>\n" +
    "        <input ng-model=\"searchText\">\n" +
    "      </md-input-container>\n" +
    "    </form>\n" +
    "\n" +
    "    <md-content style=\"max-height:839px;\">\n" +
    "      <md-list>\n" +
    "        <md-list-item class=\"md-3-line\" ng-repeat=\"position in positions | filter:searchText\"\n" +
    "                      ng-click=\"selectPosition(position)\"\n" +
    "                      ng-class=\"{selected: false}\">\n" +
    "          <div class=\"md-list-item-text\">\n" +
    "\n" +
    "            <h3>\n" +
    "              <span style=\"text-transform: uppercase;\">{{position.Symbol.Symbol}}:</span> <span\n" +
    "              ng-class=\"{positive: position.Symbol.Change.indexOf('+') > -1, negative: position.Symbol.Change.indexOf('-') > -1}\">{{position.Symbol.Ask}} {{position.Symbol.Change}} ({{position.Symbol.ChangeinPercent}})</span>\n" +
    "            </h3>\n" +
    "            <h4>Quantity: {{position.totalQuantity}} Value: {{position.totalValue | currency}}</h4>\n" +
    "\n" +
    "            <p>\n" +
    "              Daily P/L: {{position.dailyPNL | currency}}\n" +
    "              Total P/L: {{position.totalPNL | currency}}\n" +
    "            </p>\n" +
    "            <!--<md-list>-->\n" +
    "            <!--<md-list-item ng-repeat=\"buy in position.buys\">-->\n" +
    "            <!--ask: {{buy.ask}} <br />-->\n" +
    "            <!--quantity: {{buy.quantity}} <br />-->\n" +
    "            <!--created: {{buy.created}}-->\n" +
    "            <!--</md-list-item>-->\n" +
    "            <!--</md-list>-->\n" +
    "            <p>\n" +
    "              <!--Current Ask: {{position.Symbol.Ask | currency}} <br />-->\n" +
    "              <!--Original Total: {{position.ask * position.quantity | currency}} <br />-->\n" +
    "              <!--Current Total: {{position.Symbol.Ask * position.quantity | currency}} <br />-->\n" +
    "              <!--Total Earnings: {{(position.Symbol.Ask * position.quantity) - (position.ask * position.quantity) | currency}} <br />-->\n" +
    "              <!--Previous Close: {{position.Symbol.PreviousClose | currency}} <br />-->\n" +
    "              <!--Today's Earnings: {{(position.Symbol.Ask * position.quantity) - (position.Symbol.PreviousClose * position.quantity) | currency}} <br />-->\n" +
    "              <!--Created: {{position.created}}-->\n" +
    "            </p>\n" +
    "          </div>\n" +
    "          <md-divider ng-if=\"!$last\"></md-divider>\n" +
    "        </md-list-item>\n" +
    "      </md-list>\n" +
    "    </md-content>\n" +
    "\n" +
    "  </md-content>\n" +
    "</div>\n"
  );


  $templateCache.put('views/directives/sell-button.html',
    "<div class=\"sell-button\">\n" +
    "  <md-button class=\"md-secondary\" aria-label=\"Buy\" ng-click=\"openSellModal($event)\">\n" +
    "    Sell\n" +
    "  </md-button>\n" +
    "</div>\n"
  );


  $templateCache.put('views/directives/user-preferences.html',
    "<div layout=\"column\" class=\"user-preferences\">\n" +
    "  <md-toolbar class=\"md-primary\">\n" +
    "    <h1 class=\"md-toolbar-tools\">\n" +
    "      User Settings\n" +
    "    </h1>\n" +
    "  </md-toolbar>\n" +
    "\n" +
    "  <md-content layout-padding>\n" +
    "    <form name=\"userForm\">\n" +
    "      <md-input-container flex>\n" +
    "        <label>Company</label>\n" +
    "        <input ng-model=\"user.company\">\n" +
    "      </md-input-container>\n" +
    "\n" +
    "      <md-input-container flex>\n" +
    "        <label>First Name</label>\n" +
    "        <input required name=\"firstName\" ng-model=\"user.firstName\">\n" +
    "        <div ng-messages=\"userForm.firstName.$error\">\n" +
    "          <div ng-message=\"required\">This is required.</div>\n" +
    "        </div>\n" +
    "      </md-input-container>\n" +
    "      <md-input-container flex>\n" +
    "        <label>Last Name</label>\n" +
    "        <input required name=\"lastName\" ng-model=\"user.lastName\">\n" +
    "        <div ng-messages=\"userForm.lastName.$error\">\n" +
    "          <div ng-message=\"required\">This is required.</div>\n" +
    "        </div>\n" +
    "      </md-input-container>\n" +
    "\n" +
    "      <md-input-container flex>\n" +
    "        <label>Address</label>\n" +
    "        <input required name=\"address\" ng-model=\"user.address\">\n" +
    "        <div ng-messages=\"userForm.address.$error\">\n" +
    "          <div ng-message=\"required\">This is required.</div>\n" +
    "        </div>\n" +
    "      </md-input-container>\n" +
    "      <md-input-container md-no-float>\n" +
    "        <input ng-model=\"user.address2\" placeholder=\"Address 2\">\n" +
    "      </md-input-container>\n" +
    "\n" +
    "      <div layout layout-sm=\"column\">\n" +
    "        <md-input-container flex>\n" +
    "          <label>City</label>\n" +
    "          <input required name=\"city\" ng-model=\"user.city\">\n" +
    "          <div ng-messages=\"userForm.city.$error\">\n" +
    "            <div ng-message=\"required\">This is required.</div>\n" +
    "          </div>\n" +
    "        </md-input-container>\n" +
    "        <md-input-container flex>\n" +
    "          <label>State</label>\n" +
    "          <input required name=\"state\" ng-model=\"user.state\">\n" +
    "          <div ng-messages=\"userForm.state.$error\">\n" +
    "            <div ng-message=\"required\">This is required.</div>\n" +
    "          </div>\n" +
    "        </md-input-container>\n" +
    "      </div>\n" +
    "\n" +
    "      <md-input-container flex>\n" +
    "        <label>Postal Code</label>\n" +
    "        <input required name=\"postalCode\" ng-model=\"user.postalCode\">\n" +
    "        <div ng-messages=\"userForm.postalCode.$error\">\n" +
    "          <div ng-message=\"required\">This is required.</div>\n" +
    "        </div>\n" +
    "      </md-input-container>\n" +
    "\n" +
    "    </form>\n" +
    "  </md-content>\n" +
    "\n" +
    "  <md-content layout-padding>\n" +
    "    <md-switch ng-model=\"user.Preferences.refreshState\" aria-label=\"Symbol Refresh\" ng-change=\"symbolRefreshChange()\">\n" +
    "      Symbol Refresh: {{(user.Preferences.refreshState) ? \"On\" : \"Off\"}}\n" +
    "    </md-switch>\n" +
    "\n" +
    "    <md-input-container>\n" +
    "      <md-select ng-model=\"user.Preferences.refreshRate\"\n" +
    "                 aria-label=\"Refresh Rate\"\n" +
    "                 ng-disabled=\"!user.Preferences.refreshState\"\n" +
    "                 ng-change=\"symbolRefreshChange()\">\n" +
    "        <md-option value=\"10000\">10 Seconds</md-option>\n" +
    "        <md-option value=\"20000\">20 Seconds</md-option>\n" +
    "        <md-option value=\"30000\">30 Seconds</md-option>\n" +
    "        <md-option value=\"60000\">1 Minute</md-option>\n" +
    "        <md-option value=\"300000\">5 Minutes</md-option>\n" +
    "        <md-option value=\"1800000\">30 Minutes</md-option>\n" +
    "      </md-select>\n" +
    "    </md-input-container>\n" +
    "\n" +
    "  </md-content>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('views/directives/user-totals.html',
    "<div class=\"user-totals\">\n" +
    "  <md-button class=\"md-secondary\" aria-label=\"Daily P/L\">\n" +
    "    Daily P/L: {{dailyPNL | currency}}\n" +
    "  </md-button>\n" +
    "  <md-button class=\"md-secondary\" aria-label=\"Total P/L\">\n" +
    "    Total P/L: {{totalPNL | currency}}\n" +
    "  </md-button>\n" +
    "  <md-button class=\"md-secondary\" aria-label=\"Total Value\">\n" +
    "    Total Value: {{totalValue | currency}}\n" +
    "  </md-button>\n" +
    "  <md-button class=\"md-secondary\" aria-label=\"Available Cash\">\n" +
    "    Available Cash: {{user.availableCash | currency}}\n" +
    "  </md-button>\n" +
    "</div>\n"
  );


  $templateCache.put('views/directives/watch-list-details.html',
    "<md-content flex class=\"md-padding watch-list-details\">\n" +
    "\n" +
    "  <md-button ng-click=\"toggleWatchlist()\"\n" +
    "             class=\"md-primary\" hide-gt-md>\n" +
    "    Show Watchlist\n" +
    "  </md-button>\n" +
    "\n" +
    "  <md-content>\n" +
    "    <md-toolbar>\n" +
    "      <div class=\"md-toolbar-tools\" ng-show=\"symbol.Symbol\">\n" +
    "        <h2>\n" +
    "            <span style=\"text-transform: uppercase;\">\n" +
    "              {{symbol.Symbol}}: {{symbol.Name}}\n" +
    "            </span>\n" +
    "            <span\n" +
    "              ng-class=\"{positive: symbol.Change.indexOf('+') > -1, negative: symbol.Change.indexOf('-') > -1}\">\n" +
    "              {{symbol.Ask}} {{symbol.Change}} ({{symbol.ChangeinPercent}})\n" +
    "            </span>\n" +
    "        </h2>\n" +
    "        <span flex></span>\n" +
    "\n" +
    "        <buy-button user=\"user\" symbol=\"symbol\"></buy-button>\n" +
    "\n" +
    "        <sell-button user=\"user\" symbol=\"symbol\"></sell-button>\n" +
    "\n" +
    "        <md-button class=\"md-secondary\" aria-label=\"News\" ng-click=\"removeFromWatchlist(symbol, $event)\">\n" +
    "          Remove\n" +
    "        </md-button>\n" +
    "      </div>\n" +
    "    </md-toolbar>\n" +
    "\n" +
    "    <div class=\"tabbed-details\">\n" +
    "      <md-content class=\"md-padding\">\n" +
    "        <md-tabs md-dynamic-height=\"false\" md-center-tabs=\"false\" md-border-bottom>\n" +
    "          <md-tab label=\"details\">\n" +
    "            <md-content class=\"md-padding autocomplete\" layout=\"column\">\n" +
    "              <md-list class=\"fixedRows\">\n" +
    "                <md-list-item class=\"md-2-line symbol-details\">\n" +
    "                  <div class=\"md-list-item-text compact\">\n" +
    "                    <p>\n" +
    "                      Ask: <span>{{symbol.Ask}}</span> <br/>\n" +
    "                      Average Daily Volume: <span>{{symbol.AverageDailyVolume}}</span> <br/>\n" +
    "                      Bid: <span>{{symbol.Bid}}</span> <br/>\n" +
    "                      BookValue: <span>{{symbol.BookValue}}</span> <br/>\n" +
    "                      Change:\n" +
    "                      <color-number number=\"symbol.Change\"></color-number>\n" +
    "                      <br/>\n" +
    "                      Change From Fifty day Moving Average:\n" +
    "                      <color-number number=\"symbol.ChangeFromFiftydayMovingAverage\"></color-number>\n" +
    "                      <br/>\n" +
    "                      Change From Two Hundred day Moving Average:\n" +
    "                      <color-number number=\"symbol.ChangeFromTwoHundreddayMovingAverage\"></color-number>\n" +
    "                      <br/>\n" +
    "                      Change From Year High:\n" +
    "                      <color-number number=\"symbol.ChangeFromYearHigh\"></color-number>\n" +
    "                      <br/>\n" +
    "                      Change From Year Low:\n" +
    "                      <color-number number=\"symbol.ChangeFromYearLow\"></color-number>\n" +
    "                      <br/>\n" +
    "                      Change in Percent:\n" +
    "                      <color-number number=\"symbol.ChangeinPercent\"></color-number>\n" +
    "                      <br/>\n" +
    "                      Days High: <span>{{symbol.DaysHigh}}</span> <br/>\n" +
    "                      Days Low: <span>{{symbol.DaysLow}}</span> <br/>\n" +
    "                      Days Range: <span>{{symbol.DaysRange}}</span> <br/>\n" +
    "                      EBITDA: <span>{{symbol.EBITDA}}</span> <br/>\n" +
    "                      EPS Estimate Current Year: <span>{{symbol.EPSEstimateCurrentYear}}</span>\n" +
    "                    </p>\n" +
    "                  </div>\n" +
    "                </md-list-item>\n" +
    "                <md-list-item class=\"md-2-line symbol-details\">\n" +
    "                  <div class=\"md-list-item-text compact\">\n" +
    "                    <p>\n" +
    "                      EPS Estimate Next Quarter: <span>{{symbol.EPSEstimateNextQuarter}}</span> <br/>\n" +
    "                      EPS Estimate Next Year: <span>{{symbol.EPSEstimateNextYear}}</span> <br/>\n" +
    "                      Earnings Share: <span>{{symbol.EarningsShare}}</span> <br/>\n" +
    "                      Fifty day Moving Average: <span>{{symbol.FiftydayMovingAverage}}</span> <br/>\n" +
    "                      Last Trade Date: <span>{{symbol.LastTradeDate}}</span> <br/>\n" +
    "                      Last Trade Price Only: <span>{{symbol.LastTradePriceOnly}}</span> <br/>\n" +
    "                      Last Trade Time: <span>{{symbol.LastTradeTime}}</span> <br/>\n" +
    "                      Last Trade With Time: <span>{{symbol.LastTradeWithTime}}</span> <br/>\n" +
    "                      Market Capitalization: <span>{{symbol.MarketCapitalization}}</span> <br/>\n" +
    "                      One yr Target Price: <span>{{symbol.OneyrTargetPrice}}</span> <br/>\n" +
    "                      Open: <span>{{symbol.Open}}</span> <br/>\n" +
    "                      PEG Ratio: <span>{{symbol.PEGRatio}}</span> <br/>\n" +
    "                      Percent Change From Year High:\n" +
    "                      <color-number number=\"symbol.PercebtChangeFromYearHigh\"></color-number>\n" +
    "                      <br/>\n" +
    "                      Percent Change:\n" +
    "                      <color-number number=\"symbol.PercentChange\"></color-number>\n" +
    "                      <br/>\n" +
    "                      PercentChange From Fifty day Moving Average:\n" +
    "                      <color-number number=\"symbol.PercentChangeFromFiftydayMovingAverage\"></color-number>\n" +
    "                    </p>\n" +
    "                  </div>\n" +
    "                </md-list-item>\n" +
    "                <md-list-item class=\"md-2-line symbol-details\">\n" +
    "                  <div class=\"md-list-item-text compact\">\n" +
    "                    <p>\n" +
    "                      Percent Change From Two Hundred day Moving Average:\n" +
    "                      <color-number number=\"symbol.PercentChangeFromTwoHundreddayMovingAverage\"></color-number>\n" +
    "                      <br/>\n" +
    "                      Percent Change From Year Low:\n" +
    "                      <color-number number=\"symbol.PercentChangeFromYearLow\"></color-number>\n" +
    "                      <br/>\n" +
    "                      Previous Close: <span>{{symbol.PreviousClose}}</span> <br/>\n" +
    "                      Price Book: <span>{{symbol.PriceBook}}</span> <br/>\n" +
    "                      Price EPS Estimate Next Year: <span>{{symbol.PriceEPSEstimateNextYear}}</span> <br/>\n" +
    "                      Price Sales: <span>{{symbol.PriceSales}}</span> <br/>\n" +
    "                      Short Ratio: <span>{{symbol.ShortRatio}}</span> <br/>\n" +
    "                      Stock Exchange: <span>{{symbol.StockExchange}}</span> <br/>\n" +
    "                      Two Hundred day Moving Average: <span>{{symbol.YearRange}}</span> <br/>\n" +
    "                      Volume: <span>{{symbol.Volume}}</span> <br/>\n" +
    "                      Year High: <span>{{symbol.YearHigh}}</span> <br/>\n" +
    "                      Year Low: <span>{{symbol.YearLow}}</span> <br/>\n" +
    "                      Year Range: <span>{{symbol.YearRange}}</span>\n" +
    "                    </p>\n" +
    "                  </div>\n" +
    "                </md-list-item>\n" +
    "              </md-list>\n" +
    "            </md-content>\n" +
    "          </md-tab>\n" +
    "          <md-tab label=\"earnings\">\n" +
    "            <md-content class=\"md-padding\">\n" +
    "              <h1 class=\"md-display-2\">Earnings from {{symbol.Symbol}}</h1>\n" +
    "\n" +
    "              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue. Phasellus volutpat\n" +
    "                neque ac dui mattis vulputate. Etiam consequat aliquam cursus. In sodales pretium ultrices. Maecenas\n" +
    "                lectus est, sollicitudin consectetur felis nec, feugiat ultricies mi. Aliquam erat volutpat. Nam\n" +
    "                placerat,\n" +
    "                tortor in ultrices porttitor, orci enim rutrum enim, vel tempor sapien arcu a tellus. Vivamus convallis\n" +
    "                sodales ante varius gravida. Curabitur a purus vel augue ultrices ultricies id a nisl. Nullam malesuada\n" +
    "                consequat diam, a facilisis tortor volutpat et. Sed urna dolor, aliquet vitae posuere vulputate, euismod\n" +
    "                ac lorem. Sed felis risus, pulvinar at interdum quis, vehicula sed odio. Phasellus in enim venenatis,\n" +
    "                iaculis tortor eu, bibendum ante. Donec ac tellus dictum neque volutpat blandit. Praesent efficitur\n" +
    "                faucibus risus, ac auctor purus porttitor vitae. Phasellus ornare dui nec orci posuere, nec luctus\n" +
    "                mauris semper.</p>\n" +
    "            </md-content>\n" +
    "          </md-tab>\n" +
    "          <md-tab label=\"news\">\n" +
    "            <md-content class=\"md-padding\">\n" +
    "              <h1 class=\"md-display-2\">News for {{symbol.Name}}</h1>\n" +
    "\n" +
    "              <p>Integer turpis erat, porttitor vitae mi faucibus, laoreet interdum tellus. Curabitur posuere molestie\n" +
    "                dictum. Morbi eget congue risus, quis rhoncus quam. Suspendisse vitae hendrerit erat, at posuere mi.\n" +
    "                Cras eu fermentum nunc. Sed id ante eu orci commodo volutpat non ac est. Praesent ligula diam, congue eu\n" +
    "                enim scelerisque, finibus commodo lectus.</p>\n" +
    "            </md-content>\n" +
    "          </md-tab>\n" +
    "        </md-tabs>\n" +
    "      </md-content>\n" +
    "    </div>\n" +
    "\n" +
    "    <md-tabs md-selected=\"preferences.selectedHistoricalIndex\" md-border-bottom md-stretch-tabs=\"always\"\n" +
    "             style=\"min-height: inherit !important;\">\n" +
    "      <md-tab ng-repeat=\"tab in Constants.historicalTabs()\"\n" +
    "              ng-disabled=\"tab.disabled\"\n" +
    "              label=\"{{tab.title}}\"\n" +
    "              md-on-select=\"symbol.getHistoricalData(tab.startDate, tab.endDate)\">\n" +
    "      </md-tab>\n" +
    "    </md-tabs>\n" +
    "\n" +
    "    <md-card style=\"height:500px;\">\n" +
    "      <line-chart historical-data=\"symbol.historicalData\"></line-chart>\n" +
    "    </md-card>\n" +
    "  </md-content>\n" +
    "\n" +
    "</md-content>\n"
  );


  $templateCache.put('views/directives/watch-list.html',
    "<div class=\"watch-list\">\n" +
    "    <md-toolbar>\n" +
    "      <div class=\"md-toolbar-tools\">\n" +
    "        <h2>\n" +
    "          Watchlist ({{watchList.length}})\n" +
    "        </h2>\n" +
    "        <span flex></span>\n" +
    "        <md-button class=\"md-icon-button\" aria-label=\"Refresh\" ng-click=\"refreshSymbols()\">\n" +
    "          <ng-md-icon icon=\"refresh\" style=\"fill: #fff\" size=\"22\"></ng-md-icon>\n" +
    "        </md-button>\n" +
    "      </div>\n" +
    "    </md-toolbar>\n" +
    "\n" +
    "    <md-content>\n" +
    "        <md-button ng-click=\"closeWatchlist()\" class=\"md-primary\" hide-gt-md>\n" +
    "            Close Watchlist\n" +
    "        </md-button>\n" +
    "\n" +
    "        <form ng-submit=\"$event.preventDefault()\">\n" +
    "            <md-autocomplete\n" +
    "                    md-search-text-change=\"null\"\n" +
    "                    md-selected-item=\"selectedItem\"\n" +
    "                    md-search-text=\"searchText\"\n" +
    "                    md-selected-item-change=\"chooseSymbol(item)\"\n" +
    "                    md-items=\"item in search(searchText)\"\n" +
    "                    md-item-text=\"item.display\"\n" +
    "                    placeholder=\"Search Symbols\">\n" +
    "                <span md-highlight-text=\"searchText\">{{item.display}}</span>\n" +
    "            </md-autocomplete>\n" +
    "        </form>\n" +
    "\n" +
    "        <md-content style=\"max-height:839px;\">\n" +
    "            <md-list>\n" +
    "                <md-list-item class=\"md-3-line\" ng-repeat=\"watchListItem in watchList\" ng-click=\"selectSymbol(watchListItem.Symbol)\"\n" +
    "                              ng-class=\"{selected: watchListItem.Symbol == selectedSymbol}\">\n" +
    "                    <div class=\"md-list-item-text\">\n" +
    "                        <h3>\n" +
    "                          <span style=\"text-transform: uppercase;\">{{watchListItem.Symbol.Symbol}}:</span>\n" +
    "                          <span ng-class=\"{positive: watchListItem.Symbol.Change.indexOf('+') > -1, negative: watchListItem.Symbol.Change.indexOf('-') > -1}\">\n" +
    "                            {{watchListItem.Symbol.Ask}} {{watchListItem.Symbol.Change}} ({{watchListItem.Symbol.ChangeinPercent}})\n" +
    "                          </span>\n" +
    "                        </h3>\n" +
    "                        <h4>{{watchListItem.Symbol.Name}}</h4>\n" +
    "\n" +
    "                        <spark-line ng-if=\"preferences.refreshState && watchListItem.Symbol.askHistory.length > 1\" ask-history=\"watchListItem.Symbol.askHistory\"></spark-line>\n" +
    "\n" +
    "                        <!--<p>-->\n" +
    "                          <!--<span ng-repeat=\"ask in watchListItem.Symbol.askHistory track by $index\">-->\n" +
    "                            <!--{{ask}},-->\n" +
    "                          <!--</span>-->\n" +
    "                        <!--</p>-->\n" +
    "\n" +
    "                    </div>\n" +
    "                    <md-divider ng-if=\"!$last\"></md-divider>\n" +
    "                </md-list-item>\n" +
    "            </md-list>\n" +
    "        </md-content>\n" +
    "\n" +
    "    </md-content>\n" +
    "</div>\n"
  );


  $templateCache.put('views/routes/main.html',
    "<div ng-show=\"isLoading\" layout=\"column\" layout-margin\n" +
    "     style=\"position: fixed; top: -14px; left: 0px; width: 100%; z-index: 9999;\">\n" +
    "  <md-progress-linear md-mode=\"indeterminate\"></md-progress-linear>\n" +
    "</div>\n" +
    "<md-content>\n" +
    "  <md-toolbar>\n" +
    "    <div class=\"md-toolbar-tools\">\n" +
    "      <h2>\n" +
    "        <span>StockTracker</span>\n" +
    "      </h2>\n" +
    "      <span flex></span>\n" +
    "      <user-totals user=\"User\"></user-totals>\n" +
    "      <span flex></span>\n" +
    "      <md-button class=\"md-secondary\" aria-label=\"Watchlist\" ng-click=\"watchlistToggle()\">\n" +
    "        Watchlist ({{User.WatchList.length}})\n" +
    "      </md-button>\n" +
    "      <md-button class=\"md-secondary\" aria-label=\"Positions\" ng-click=\"positionsToggle()\">\n" +
    "        Positions ({{User.Positions.length}})\n" +
    "      </md-button>\n" +
    "\n" +
    "      <md-icon md-svg-icon=\"images/icons/more_vert.svg\"></md-icon>\n" +
    "\n" +
    "      <md-button class=\"md-secondary\" aria-label=\"News\" ng-click=\"toggleUserPreferences()\">\n" +
    "        {{User.lastName}}, {{User.firstName}}\n" +
    "      </md-button>\n" +
    "    </div>\n" +
    "  </md-toolbar>\n" +
    "  <br>\n" +
    "</md-content>\n" +
    "\n" +
    "<div layout=\"column\">\n" +
    "  <section layout=\"row\" flex>\n" +
    "    <!--Begin Left Navbar-->\n" +
    "    <md-sidenav ng-show=\"showWatchlist && !showPositions\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"watch-list\"\n" +
    "                md-is-locked-open=\"$mdMedia('gt-md')\">\n" +
    "      <watch-list watch-list=\"User.WatchList\"\n" +
    "                  preferences=\"User.Preferences\"\n" +
    "                  selected-symbol=\"User.selectedSymbol\">\n" +
    "      </watch-list>\n" +
    "    </md-sidenav>\n" +
    "    <md-sidenav ng-show=\"!showWatchlist && showPositions\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"positions\"\n" +
    "                md-is-locked-open=\"$mdMedia('gt-md')\">\n" +
    "      <positions positions=\"User.Positions\"></positions>\n" +
    "    </md-sidenav>\n" +
    "    <!--End Left Navbar-->\n" +
    "\n" +
    "    <watch-list-details user=\"User\"\n" +
    "                        symbol=\"User.selectedSymbol\">\n" +
    "    </watch-list-details>\n" +
    "\n" +
    "    <md-sidenav class=\"md-sidenav-right md-whiteframe-z2\" md-component-id=\"user-preferences\">\n" +
    "      <user-preferences user=\"User\"></user-preferences>\n" +
    "    </md-sidenav>\n" +
    "  </section>\n" +
    "</div>\n"
  );

}]);
