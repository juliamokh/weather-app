// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToArray = addToArray;
var events = exports.events = {
  events: {},
  subscribe: function subscribe(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  unsubscribe: function unsubscribe(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  },
  publish: function publish(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (fn) {
        return fn(data);
      });
    }
  }
};

function addToArray(list, location) {
  var arr = list;
  arr.push(location);
  arr = removeDuplicates(arr, 'city');
  if (arr.length === 11) arr.shift();
  return arr;
};

function removeDuplicates(myArr, prop) {
  return myArr.filter(function (obj, pos, arr) {
    return arr.map(function (mapObj) {
      return mapObj[prop];
    }).indexOf(obj[prop]) === pos;
  });
};
},{}],16:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../utils/index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ButtonStar = function () {
  function ButtonStar() {
    _classCallCheck(this, ButtonStar);

    this.host = document.createElement('button');
    this.host.classList.add('btn-star');
    this.host.type = 'button';

    this.handleStarClick = this.handleStarClick.bind(this);
    this.host.addEventListener('click', this.handleStarClick);
  }

  _createClass(ButtonStar, [{
    key: 'handleStarClick',
    value: function handleStarClick(ev) {
      _index.events.publish('starClick');
    }
  }, {
    key: 'render',
    value: function render() {
      this.host.innerHTML = '<i class="far fa-star"></i>';
      return this.host;
    }
  }]);

  return ButtonStar;
}();

exports.default = ButtonStar;
;
},{"../utils/index":13}],17:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../utils/index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputField = function () {
  function InputField() {
    _classCallCheck(this, InputField);

    this.host = document.createElement('input');
    this.host.name = 'search';
    this.host.type = 'text';
    this.host.setAttribute('placeholder', 'Type location and press enter');
    this.host.setAttribute('required', '');
    this.host.setAttribute('autofocus', '');

    this.initAutocomplete();
  }

  _createClass(InputField, [{
    key: 'initAutocomplete',
    value: function initAutocomplete() {
      var autocomplete = new google.maps.places.Autocomplete(this.host, { types: ['geocode'] });
      autocomplete.addListener('place_changed', this.onPlaceChanged);
    }
  }, {
    key: 'onPlaceChanged',
    value: function onPlaceChanged() {
      var place = this.getPlace();
      console.log(place);
      if (!place.geometry) return;else {
        var location = {
          city: place.name,
          lat: place.geometry.location.lat(),
          lon: place.geometry.location.lng()
        };
        _index.events.publish('userInput', location);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.host;
    }
  }]);

  return InputField;
}();

exports.default = InputField;
;
},{"../utils/index":13}],38:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../utils/index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SelectUnits = function () {
  function SelectUnits() {
    _classCallCheck(this, SelectUnits);

    this.host = document.createElement('select');
    this.host.id = 'units';

    this.handleUnitsChange = this.handleUnitsChange.bind(this);
    this.host.addEventListener('change', this.handleUnitsChange);
  }

  _createClass(SelectUnits, [{
    key: 'handleUnitsChange',
    value: function handleUnitsChange(ev) {
      if (ev.target.id == 'units') {
        var units = ev.target.value;
        _index.events.publish('unitsChange', units);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      this.host.innerHTML = '\n      <option value="M" selected>\xB0C</option>\n      <option value="I">\xB0F</option>\n    ';
      return this.host;
    }
  }]);

  return SelectUnits;
}();

exports.default = SelectUnits;
;
},{"../utils/index":13}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ButtonStar = require('./ButtonStar');

var _ButtonStar2 = _interopRequireDefault(_ButtonStar);

var _InputField = require('./InputField');

var _InputField2 = _interopRequireDefault(_InputField);

var _SelectUnits = require('./SelectUnits');

var _SelectUnits2 = _interopRequireDefault(_SelectUnits);

var _index = require('../utils/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchBar = function () {
  function SearchBar() {
    _classCallCheck(this, SearchBar);

    this.host = document.createElement('form');
    this.host.classList.add('search-bar');
    this.icon = document.createElement('div');
    this.icon.classList.add('icon-search');

    this.ButtonStar = new _ButtonStar2.default();
    this.InputField = new _InputField2.default();
    this.SelectUnits = new _SelectUnits2.default();

    this.host.addEventListener('submit', this.handleSubmit);
  }

  _createClass(SearchBar, [{
    key: 'handleSubmit',
    value: function handleSubmit(ev) {
      ev.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      this.icon.innerHTML = '<i class="fas fa-search"></i>';
      this.host.appendChild(this.ButtonStar.render());
      this.host.appendChild(this.InputField.render());
      this.host.appendChild(this.icon);
      this.host.appendChild(this.SelectUnits.render());
      return this.host;
    }
  }]);

  return SearchBar;
}();

exports.default = SearchBar;
;
},{"./ButtonStar":16,"./InputField":17,"./SelectUnits":38,"../utils/index":13}],20:[function(require,module,exports) {
module.exports="/dist/64ae1bf59ee327bae07f5d4cc2d1d1dd.svg";
},{}],21:[function(require,module,exports) {
module.exports="/dist/80c56890884cb3ff8ffe981a991206fa.svg";
},{}],22:[function(require,module,exports) {
module.exports="/dist/fc47c53ecea57fd14536bc328dc0b1a1.svg";
},{}],23:[function(require,module,exports) {
module.exports="/dist/c7bd23dc27bf60d598b63afe7c7e63f4.svg";
},{}],24:[function(require,module,exports) {
module.exports="/dist/c8a36139595a522c4a595c1ca36b65b5.svg";
},{}],25:[function(require,module,exports) {
module.exports="/dist/833afb704f4850be0a19f31b159e0bcf.svg";
},{}],26:[function(require,module,exports) {
module.exports="/dist/2018820de9afb709458580b7f5042747.svg";
},{}],27:[function(require,module,exports) {
module.exports="/dist/8a4fc2bfc9c54229591a1af4522b19de.svg";
},{}],28:[function(require,module,exports) {
module.exports="/dist/e1ab257c3306ef18c8b49b6b104674ab.svg";
},{}],29:[function(require,module,exports) {
module.exports="/dist/f8af50e5148c36aaa1315112a1e7eb41.svg";
},{}],30:[function(require,module,exports) {
module.exports="/dist/e1845bc11a800a635a97d6398c175853.svg";
},{}],31:[function(require,module,exports) {
module.exports="/dist/740212f8c417cfdecf269d3c71f14a5c.svg";
},{}],32:[function(require,module,exports) {
module.exports="/dist/44381600aa94a0fb364556c2ff29f294.svg";
},{}],15:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawIcon = undefined;

var _thunder = require('../img/thunder.svg');

var _thunder2 = _interopRequireDefault(_thunder);

var _rainy = require('../img/rainy7.svg');

var _rainy2 = _interopRequireDefault(_rainy);

var _rainy3 = require('../img/rainy4.svg');

var _rainy4 = _interopRequireDefault(_rainy3);

var _rainy5 = require('../img/rainy5.svg');

var _rainy6 = _interopRequireDefault(_rainy5);

var _rainy7 = require('../img/rainy6.svg');

var _rainy8 = _interopRequireDefault(_rainy7);

var _rainy9 = require('../img/rainy3.svg');

var _rainy10 = _interopRequireDefault(_rainy9);

var _snowy = require('../img/snowy3.svg');

var _snowy2 = _interopRequireDefault(_snowy);

var _snowy3 = require('../img/snowy5.svg');

var _snowy4 = _interopRequireDefault(_snowy3);

var _snowy5 = require('../img/snowy6.svg');

var _snowy6 = _interopRequireDefault(_snowy5);

var _cloudyDay = require('../img/cloudyDay1.svg');

var _cloudyDay2 = _interopRequireDefault(_cloudyDay);

var _day = require('../img/day.svg');

var _day2 = _interopRequireDefault(_day);

var _cloudyDay3 = require('../img/cloudyDay2.svg');

var _cloudyDay4 = _interopRequireDefault(_cloudyDay3);

var _cloudy = require('../img/cloudy.svg');

var _cloudy2 = _interopRequireDefault(_cloudy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drawIcon = exports.drawIcon = function drawIcon(code) {
  var icon = '';
  switch (code) {
    case '200':
    case '201':
    case '202':
    case '230':
    case '231':
    case '232':
    case '233':
      icon = _thunder2.default;
      break;
    case '300':
    case '301':
    case '302':
    case '611':
    case '612':
      icon = _rainy2.default;
      break;
    case '500':
    case '520':
      icon = _rainy4.default;
      break;
    case '501':
    case '511':
      icon = _rainy6.default;
      break;
    case '502':
    case '522':
    case '900':
      icon = _rainy8.default;
      break;
    case '521':
      icon = _rainy10.default;
      break;
    case '600':
    case '610':
    case '621':
      icon = _snowy2.default;
      break;
    case '601':
      icon = _snowy4.default;
      break;
    case '602':
    case '622':
    case '623':
      icon = _snowy6.default;
      break;
    case '700':
    case '711':
    case '721':
    case '731':
    case '741':
    case '751':
      icon = _cloudyDay2.default;
      break;
    case '800':
      icon = _day2.default;
      break;
    case '801':
    case '802':
    case '803':
      icon = _cloudyDay4.default;
      break;
    case '804':
      icon = _cloudy2.default;
      break;
  };
  return '<img src="' + icon + '">';
};
},{"../img/thunder.svg":20,"../img/rainy7.svg":21,"../img/rainy4.svg":22,"../img/rainy5.svg":23,"../img/rainy6.svg":24,"../img/rainy3.svg":25,"../img/snowy3.svg":26,"../img/snowy5.svg":27,"../img/snowy6.svg":28,"../img/cloudyDay1.svg":29,"../img/day.svg":30,"../img/cloudyDay2.svg":31,"../img/cloudy.svg":32}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _icons = require('../utils/icons');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DayForecast = function () {
  function DayForecast() {
    _classCallCheck(this, DayForecast);

    this.host = document.createElement('div');
    this.host.classList.add('today-forecast');
  }

  _createClass(DayForecast, [{
    key: 'getWeekday',
    value: function getWeekday(datetime) {
      var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var date = new Date(datetime);
      return weekday[date.getDay()];
    }
  }, {
    key: 'getSpeedUnits',
    value: function getSpeedUnits(units) {
      if (units === 'M') return 'm/s';
      if (units === 'I') return 'mph';
    }
  }, {
    key: 'render',
    value: function render(forecast, units) {
      var day = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      this.host.classList.add('active');
      this.host.innerHTML = '\n      <div class="city">' + forecast.city_name + ', ' + forecast.country_code + '</div>\n      <div class="container">\n        <div class="wrapper">\n          <div class="current-day">' + this.getWeekday(forecast.data[day].datetime) + '</div>\n          <time class="date">' + forecast.data[day].datetime + '</time>\n          <div class="wind">Wind ' + forecast.data[day].wind_spd + ' ' + this.getSpeedUnits(units) + '</div>\n          <div class="humidity"><i class="fas fa-tint"></i> ' + forecast.data[day].rh + '%</div>\n        </div>\n        <div class="wrapper">\n          <div>' + (0, _icons.drawIcon)(forecast.data[day].weather.code) + '</div>\n          <div class="weather">' + forecast.data[day].weather.description + '</div>\n        </div>\n        <div class="wrapper">\n          <div class="temperature">\n            <div class="min_temperature"><i class="fas fa-long-arrow-alt-down"></i> ' + forecast.data[day].min_temp + '\xB0</div>\n            <div class="max_temperature"><i class="fas fa-long-arrow-alt-up"></i> ' + forecast.data[day].max_temp + '\xB0</div>\n          </div>\n          <div class="current-temperature">' + forecast.data[day].temp + '\xB0</div>\n        </div>\n      </div>\n    ';
      return this.host;
    }
  }]);

  return DayForecast;
}();

exports.default = DayForecast;
;
},{"../utils/icons":15}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _icons = require('../utils/icons');

var _index = require('../utils/index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WeekForecast = function () {
  function WeekForecast() {
    _classCallCheck(this, WeekForecast);

    this.host = document.createElement('div');
    this.host.classList.add('week-forecast');

    this.listenDay = this.listenDay.bind(this);
    this.host.addEventListener('click', this.listenDay);
  }

  _createClass(WeekForecast, [{
    key: 'getShortWeekday',
    value: function getShortWeekday(datetime) {
      var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      var date = new Date(datetime);
      return weekday[date.getDay()];
    }
  }, {
    key: 'listenDay',
    value: function listenDay(ev) {
      var target = ev.target;
      while (target != this) {
        if (target.className == 'day-forecast') {
          var day = target.id;
          _index.events.publish('dayClick', day);
          return;
        }
        target = target.parentNode;
      }
    }
  }, {
    key: 'render',
    value: function render(forecast) {
      this.host.classList.add('active');
      this.host.innerHTML = '';
      for (var i = 0; i < 7; i++) {
        this.host.innerHTML += '\n        <div class="day-forecast" id="' + i + '">\n          <div class="day">' + this.getShortWeekday(forecast.data[i].datetime) + '</div>\n          <div>' + (0, _icons.drawIcon)(forecast.data[i].weather.code) + '</div>\n          <div class="temperature">' + forecast.data[i].temp + '\xB0</div>\n        </div>\n      ';
      }
      return this.host;
    }
  }]);

  return WeekForecast;
}();

exports.default = WeekForecast;
;
},{"../utils/icons":15,"../utils/index":13}],11:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../utils/index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RecentCities = function () {
  function RecentCities() {
    _classCallCheck(this, RecentCities);

    this.host = document.createElement('div');
    this.host.classList.add('recent-list');

    this.handleCityClick = this.handleCityClick.bind(this);
    this.host.addEventListener('click', this.handleCityClick);
    this.listenRecent();
  }

  _createClass(RecentCities, [{
    key: 'listenRecent',
    value: function listenRecent() {
      var _this = this;

      _index.events.subscribe('recent', function (location) {
        return _this.addToRecent(location);
      });
    }
  }, {
    key: 'handleCityClick',
    value: function handleCityClick(ev) {
      var target = ev.target;
      while (target != this) {
        if (target.tagName == 'LI') {
          var location = this.list[target.id];
          _index.events.publish('cityClick', location);
          return;
        };
        target = target.parentNode;
      }
    }
  }, {
    key: 'addToRecent',
    value: function addToRecent(location) {
      var arr = (0, _index.addToArray)(this.list, location);
      localStorage.setItem('recentCities', JSON.stringify(arr));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.list.length) {
        this.host.classList.add('active');
        this.host.innerHTML = '\n        <h2><i class="fas fa-history"></i> Recently viewed</h2>\n        <ul id="recent"></ul>\n      ';
        this.list.forEach(function (location, index) {
          _this2.host.insertAdjacentHTML('beforeend', '<li id="' + index + '">' + location.city + '</li>');
        });
      }
    }
  }, {
    key: 'list',
    get: function get() {
      return localStorage.getItem('recentCities') ? JSON.parse(localStorage.getItem('recentCities')) : [];
    }
  }]);

  return RecentCities;
}();

exports.default = RecentCities;
;
},{"../utils/index":13}],10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../utils/index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FavoriteCities = function () {
  function FavoriteCities() {
    _classCallCheck(this, FavoriteCities);

    this.host = document.createElement('div');
    this.host.classList.add('favorite-list');

    this.handleCityClick = this.handleCityClick.bind(this);
    this.host.addEventListener('click', this.handleCityClick);
    this.listenFavorite();
  }

  _createClass(FavoriteCities, [{
    key: 'listenFavorite',
    value: function listenFavorite() {
      var _this = this;

      _index.events.subscribe('favorite', function (location) {
        return _this.addToFavorite(location);
      });
    }
  }, {
    key: 'handleCityClick',
    value: function handleCityClick(ev) {
      var target = ev.target;
      while (target != this) {
        if (target.tagName == 'LI') {
          var location = this.list[target.id];
          _index.events.publish('cityClick', location);
          return;
        };
        target = target.parentNode;
      }
    }
  }, {
    key: 'addToFavorite',
    value: function addToFavorite(location) {
      var arr = (0, _index.addToArray)(this.list, location);
      localStorage.setItem('favoriteCities', JSON.stringify(arr));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.list.length) {
        this.host.classList.add('active');
        this.host.innerHTML = '\n        <h2><i class="far fa-star"></i> Favorite</h2>\n        <ul id="favorite"></ul>\n      ';
        this.list.forEach(function (location, index) {
          _this2.host.insertAdjacentHTML('beforeend', '<li id="' + index + '">' + location.city + '</li>');
        });
      }
    }
  }, {
    key: 'list',
    get: function get() {
      return localStorage.getItem('favoriteCities') ? JSON.parse(localStorage.getItem('favoriteCities')) : [];
    }
  }]);

  return FavoriteCities;
}();

exports.default = FavoriteCities;
;
},{"../utils/index":13}],12:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var URL = 'https://api.weatherbit.io/v2.0/forecast/daily';
var KEY = '?key=ddb43221d2a548889fb0e23b1266b34c';
var DAYS = '&days=7';
var BASE_PATH = '' + URL + KEY + DAYS;

var get = exports.get = function get(path) {
  return fetch('' + BASE_PATH + path).then(function (response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }).catch(function (err) {
    return console.log('Request failed: ' + err.message);
  });
};
},{}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SearchBar = require('./SearchBar');

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _DayForecast = require('./DayForecast');

var _DayForecast2 = _interopRequireDefault(_DayForecast);

var _WeekForecast = require('./WeekForecast');

var _WeekForecast2 = _interopRequireDefault(_WeekForecast);

var _RecentCities = require('./RecentCities');

var _RecentCities2 = _interopRequireDefault(_RecentCities);

var _FavoriteCities = require('./FavoriteCities');

var _FavoriteCities2 = _interopRequireDefault(_FavoriteCities);

var _api = require('../utils/api');

var _index = require('../utils/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

    this.state = {
      city: '',
      lat: '',
      lon: '',
      units: 'M',
      data: {}
    };
    this.main = document.querySelector('main');
    this.aside = document.querySelector('aside');

    this.SearchBar = new _SearchBar2.default();
    this.DayForecast = new _DayForecast2.default();
    this.WeekForecast = new _WeekForecast2.default();
    this.RecentCities = new _RecentCities2.default();
    this.FavoriteCities = new _FavoriteCities2.default();

    this.getCityFromLink();
    this.popLink();
    this.listenUserInput();
    this.listenUnitsChange();
    this.listenStarClick();
    this.listenDayClick();
    this.listenCityClick();
  }

  _createClass(App, [{
    key: 'getCityFromLink',
    value: function getCityFromLink() {
      var city = window.location.search.substring(1);
      if (city.length) {
        this.getCityForecast(city);
      }
    }
  }, {
    key: 'popLink',
    value: function popLink() {
      var _this = this;

      window.addEventListener('popstate', function (ev) {
        if (ev.state !== null) {
          _this.getCityForecast(ev.state);
        }
      });
    }
  }, {
    key: 'listenUserInput',
    value: function listenUserInput() {
      var _this2 = this;

      _index.events.subscribe('userInput', function (location) {
        _this2.state.lat = location.lat;
        _this2.state.lon = location.lon;
        _this2.getGeoForecast();
      });
    }
  }, {
    key: 'listenUnitsChange',
    value: function listenUnitsChange() {
      var _this3 = this;

      _index.events.subscribe('unitsChange', function (units) {
        _this3.state.units = units;
      });
    }
  }, {
    key: 'listenStarClick',
    value: function listenStarClick() {
      var _this4 = this;

      _index.events.subscribe('starClick', function () {
        if (_this4.state.city.length) {
          _index.events.publish('favorite', {
            city: _this4.state.city,
            lat: _this4.state.lat,
            lon: _this4.state.lon
          });
          _this4.FavoriteCities.render();
        }
      });
    }
  }, {
    key: 'listenDayClick',
    value: function listenDayClick() {
      var _this5 = this;

      _index.events.subscribe('dayClick', function (day) {
        _this5.DayForecast.render(_this5.state.data, _this5.state.units, day);
      });
    }
  }, {
    key: 'listenCityClick',
    value: function listenCityClick() {
      var _this6 = this;

      _index.events.subscribe('cityClick', function (location) {
        if (location.lat.length && location.lon.length) {
          _this6.getGeoForecast(location.lat, location.lon);
        } else {
          _this6.getCityForecast(location.city);
        }
      });
    }
  }, {
    key: 'getCityForecast',
    value: function getCityForecast() {
      var city = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.city;

      var search = '&city=' + city;
      this.getForecast(search);
    }
  }, {
    key: 'getGeoForecast',
    value: function getGeoForecast() {
      var lat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.lat;
      var lon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.lon;

      var search = '&lat=' + lat + '&lon=' + lon;
      this.getForecast(search);
    }
  }, {
    key: 'getForecast',
    value: function getForecast(search) {
      var _this7 = this;

      var path = '&units=' + this.state.units + search;
      (0, _api.get)(path).then(function (data) {
        _this7.state.data = data;
        _this7.state.city = data.city_name;
        _this7.processData();
      });
    }
  }, {
    key: 'processData',
    value: function processData() {
      this.changeLink(this.state.city);
      this.DayForecast.render(this.state.data, this.state.units);
      this.WeekForecast.render(this.state.data);
      _index.events.publish('recent', {
        city: this.state.city,
        lat: this.state.lat,
        lon: this.state.lon
      });
      this.RecentCities.render();
    }
  }, {
    key: 'changeLink',
    value: function changeLink(city) {
      window.history.pushState(city, null, '?' + city);
    }
  }, {
    key: 'render',
    value: function render() {
      this.SearchBar.render();
      this.FavoriteCities.render();
      this.RecentCities.render();
      this.main.appendChild(this.SearchBar.host);
      this.main.appendChild(this.DayForecast.host);
      this.main.appendChild(this.WeekForecast.host);
      this.aside.appendChild(this.FavoriteCities.host);
      this.aside.appendChild(this.RecentCities.host);
    }
  }]);

  return App;
}();

exports.default = App;
;
},{"./SearchBar":7,"./DayForecast":8,"./WeekForecast":9,"./RecentCities":11,"./FavoriteCities":10,"../utils/api":12,"../utils/index":13}],2:[function(require,module,exports) {
'use strict';

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _App2.default();
app.render();
},{"./components/App":6}],39:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '51154' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[39,2])
//# sourceMappingURL=/dist/fe2cd0ec559fcd541e3231ee14ce3f9b.map