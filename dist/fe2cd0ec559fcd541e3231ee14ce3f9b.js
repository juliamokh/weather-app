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
})({8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawIcon = drawIcon;
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

function drawIcon(code) {
  var icon = '';
  switch (code) {
    case '200':
    case '201':
    case '202':
    case '230':
    case '231':
    case '232':
    case '233':
      icon = 'thunder';
      break;
    case '300':
    case '301':
    case '302':
    case '611':
    case '612':
      icon = 'rainy-7';
      break;
    case '500':
    case '520':
      icon = 'rainy-4';
      break;
    case '501':
    case '511':
      icon = 'rainy-5';
      break;
    case '502':
    case '522':
    case '900':
      icon = 'rainy-6';
      break;
    case '521':
      icon = 'rainy-3';
      break;
    case '600':
    case '610':
    case '621':
      icon = 'snowy-3';
      break;
    case '601':
      icon = 'snowy-5';
      break;
    case '602':
    case '622':
    case '623':
      icon = 'snowy-6';
      break;
    case '700':
    case '711':
    case '721':
    case '731':
    case '741':
    case '751':
      icon = 'cloudy-day-1';
      break;
    case '800':
      icon = 'day';
      break;
    case '801':
    case '802':
    case '803':
      icon = 'cloudy-day-2';
      break;
    case '804':
      icon = 'cloudy';
      break;
  };
  return '<img src="../img/' + icon + '.svg">';
};
},{}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../utils/index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchBar = function () {
  function SearchBar() {
    _classCallCheck(this, SearchBar);

    this.host = document.createElement('div');
    this.host.classList.add('search-bar-container');
    this.handleSubmit = this.handleSubmit.bind(this);
    this.host.addEventListener('submit', this.handleSubmit);
  }

  _createClass(SearchBar, [{
    key: 'handleSubmit',
    value: function handleSubmit(ev) {
      ev.preventDefault();
      var city = ev.target.elements.search.value.trim();
      if (city.length) {
        _index.events.publish('userInput', city);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      this.host.innerHTML = '\n      <form class="search-bar" onsubmit>\n        <button class="btn-star" id="star" type="button"><i class="far fa-star"></i></button>\n        <input name="search" type="text" placeholder="Type location and press enter" required>\n        <button class="icon-search" type="submit"><i class="fas fa-search"></i></button>\n        <select id="units">\n          <option value="GC" selected>\xB0C</option>\n          <option value="FA">\xB0F</option>\n        </select>\n      </form>\n    ';
      return this.host;
    }
  }]);

  return SearchBar;
}();

exports.default = SearchBar;
;
},{"../utils/index":8}],14:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../utils/index');

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
    key: 'render',
    value: function render(forecast, day) {
      this.host.innerHTML = '\n      <div class="city">' + forecast.city_name + ', ' + forecast.country_code + '</div>\n      <div class="container">\n        <div class="wrapper">\n          <div class="current-day">' + this.getWeekday(forecast.data[day].datetime) + '</div>\n          <time class="date">' + forecast.data[day].datetime + '</time>\n          <div class="wind">Wind ' + forecast.data[day].wind_spd + '</div>\n          <div class="humidity"><i class="fas fa-tint"></i> ' + forecast.data[day].rh + '%</div>\n        </div>\n        <div class="wrapper">\n          <div>' + (0, _index.drawIcon)(forecast.data[day].weather.code) + '</div>\n          <div class="weather">' + forecast.data[day].weather.description + '</div>\n        </div>\n        <div class="wrapper">\n          <div class="temperature">\n            <div class="min_temperature"><i class="fas fa-long-arrow-alt-down"></i> ' + forecast.data[day].min_temp + '\xB0</div>\n            <div class="max_temperature"><i class="fas fa-long-arrow-alt-up"></i> ' + forecast.data[day].max_temp + '\xB0</div>\n          </div>\n          <div class="current-temperature">' + forecast.data[day].temp + '\xB0</div>\n        </div>\n      </div>\n    ';
      return this.host;
    }
  }]);

  return DayForecast;
}();

exports.default = DayForecast;
;
},{"../utils/index":8}],13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
var START_POINT = 'https://api.weatherbit.io/v2.0/forecast/daily';
var KEY = '?key=ddb43221d2a548889fb0e23b1266b34c';
var DAYS = '&days=7';
var BASE_PATH = '' + START_POINT + KEY + DAYS;

function get(path) {
  return fetch('' + BASE_PATH + path).then(function (response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }).catch(function (err) {
    return console.log(err);
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

var _api = require('../utils/api');

var _index = require('../utils/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

    this.state = {
      city: '',
      units: 'M',
      data: {}
    };
    this.host = document.getElementById('root');
    this.SearchBar = new _SearchBar2.default();
    this.listenInput();
  }

  _createClass(App, [{
    key: 'listenInput',
    value: function listenInput() {
      var _this = this;

      _index.events.subscribe('userInput', function (input) {
        _this.state.city = input;
        console.log(_this.state.city);
        _this.getForecast();
      });
    }
  }, {
    key: 'getForecast',
    value: function getForecast() {
      var _this2 = this;

      var path = '&units=' + this.state.units + '&city=' + this.state.city;
      (0, _api.get)(path).then(function (data) {
        _this2.state.data = data;
        console.log(_this2.state.data);
        // this.processData();
      });
    }
  }, {
    key: 'processData',
    value: function processData() {
      // forecast.renderDayForecast(this.data, 0);
      // forecast.renderWeekForecast(this.data);
      // history.addToRecent(this.city);
      // history.renderRecent();
      // link.changeLink(this.city);
    }
  }, {
    key: 'render',
    value: function render() {
      this.host.appendChild(this.SearchBar.render());
    }
  }]);

  return App;
}();

;

exports.default = App;
},{"./SearchBar":7,"./DayForecast":14,"../utils/api":13,"../utils/index":8}],2:[function(require,module,exports) {
'use strict';

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _App2.default();
app.render();
},{"./components/App":6}],10:[function(require,module,exports) {

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '60429' + '/');
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
},{}]},{},[10,2])
//# sourceMappingURL=/dist/fe2cd0ec559fcd541e3231ee14ce3f9b.map