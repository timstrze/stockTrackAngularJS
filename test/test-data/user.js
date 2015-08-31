if (!window.testData) {
  window.testData = {};
}


window.testData.User = {
  "firstName": "Timothy",
  "lastName": "Strzelecki",
  "phone": "312-804-6933",
  "address": "333 W. North Ave",
  "address2": "#9",
  "city": "Chicago",
  "state": "Il",
  "postalCode": "60610",
  "email": "timstrze@gmail.com",

  "availableCash": 15000,

  "WatchList": [
    {
      "symbol":"AAPL"
    },
    {
      "symbol":"AXP"
    },
    {
      "symbol":"WFM"
    },
    {
      "symbol":"DIS"
    },
    {
      "symbol":"rcl"
    }
  ],

  "Positions": [
    {
      "symbol":"AXP",
      "buys": [
        {
          "ask":"79.41",
          "quantity":10,
          "created":"2015-08-07 2:07:45 PM"
        },
        {
          "ask":"79.61",
          "quantity":9,
          "created":"2015-08-07 7:05:45 PM"
        }
      ]
    },
    {
      "symbol":"RCL",
      "buys": [
        {
          "ask": "90.41",
          "quantity": 92,
          "created": "2015-08-06 2:05:45 PM"
        }
      ]
    },
    {
      "symbol":"WFM",
      "buys": [
        {
          "ask": "35.80",
          "quantity": 52,
          "created": "2015-08-03 2:05:45 PM"
        }
      ]
    },
    {
      "symbol":"DIS",
      "buys": [
        {
          "ask": "109.80",
          "quantity": 52,
          "created": "2015-08-01 2:05:45 PM"
        }
      ]
    }
  ],

  "Preferences": {
    "selectedHistoricalIndex": 2,
    "refreshState": false,
    "refreshRate": 10000
  }

};
