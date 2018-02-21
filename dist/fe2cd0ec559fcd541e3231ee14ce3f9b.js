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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
},{"../utils/index":8}],18:[function(require,module,exports) {
module.exports="/dist/64ae1bf59ee327bae07f5d4cc2d1d1dd.svg";
},{}],19:[function(require,module,exports) {
module.exports="/dist/80c56890884cb3ff8ffe981a991206fa.svg";
},{}],20:[function(require,module,exports) {
module.exports="/dist/fc47c53ecea57fd14536bc328dc0b1a1.svg";
},{}],21:[function(require,module,exports) {
module.exports="/dist/c7bd23dc27bf60d598b63afe7c7e63f4.svg";
},{}],22:[function(require,module,exports) {
module.exports="/dist/c8a36139595a522c4a595c1ca36b65b5.svg";
},{}],23:[function(require,module,exports) {
module.exports="/dist/833afb704f4850be0a19f31b159e0bcf.svg";
},{}],24:[function(require,module,exports) {
module.exports="/dist/2018820de9afb709458580b7f5042747.svg";
},{}],25:[function(require,module,exports) {
module.exports="/dist/8a4fc2bfc9c54229591a1af4522b19de.svg";
},{}],27:[function(require,module,exports) {
module.exports="/dist/e1ab257c3306ef18c8b49b6b104674ab.svg";
},{}],26:[function(require,module,exports) {
module.exports="/dist/f8af50e5148c36aaa1315112a1e7eb41.svg";
},{}],28:[function(require,module,exports) {
module.exports="/dist/e1845bc11a800a635a97d6398c175853.svg";
},{}],29:[function(require,module,exports) {
module.exports="/dist/740212f8c417cfdecf269d3c71f14a5c.svg";
},{}],30:[function(require,module,exports) {
module.exports="/dist/44381600aa94a0fb364556c2ff29f294.svg";
},{}],17:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawIcon = drawIcon;

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
},{"../img/thunder.svg":18,"../img/rainy7.svg":19,"../img/rainy4.svg":20,"../img/rainy5.svg":21,"../img/rainy6.svg":22,"../img/rainy3.svg":23,"../img/snowy3.svg":24,"../img/snowy5.svg":25,"../img/snowy6.svg":27,"../img/cloudyDay1.svg":26,"../img/day.svg":28,"../img/cloudyDay2.svg":29,"../img/cloudy.svg":30}],14:[function(require,module,exports) {
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
    key: 'render',
    value: function render(forecast, day) {
      this.host.classList.add('active');
      this.host.innerHTML = '\n      <div class="city">' + forecast.city_name + ', ' + forecast.country_code + '</div>\n      <div class="container">\n        <div class="wrapper">\n          <div class="current-day">' + this.getWeekday(forecast.data[day].datetime) + '</div>\n          <time class="date">' + forecast.data[day].datetime + '</time>\n          <div class="wind">Wind ' + forecast.data[day].wind_spd + '</div>\n          <div class="humidity"><i class="fas fa-tint"></i> ' + forecast.data[day].rh + '%</div>\n        </div>\n        <div class="wrapper">\n          <div>' + (0, _icons.drawIcon)(forecast.data[day].weather.code) + '</div>\n          <div class="weather">' + forecast.data[day].weather.description + '</div>\n        </div>\n        <div class="wrapper">\n          <div class="temperature">\n            <div class="min_temperature"><i class="fas fa-long-arrow-alt-down"></i> ' + forecast.data[day].min_temp + '\xB0</div>\n            <div class="max_temperature"><i class="fas fa-long-arrow-alt-up"></i> ' + forecast.data[day].max_temp + '\xB0</div>\n          </div>\n          <div class="current-temperature">' + forecast.data[day].temp + '\xB0</div>\n        </div>\n      </div>\n    ';
      return this.host;
    }
  }]);

  return DayForecast;
}();

exports.default = DayForecast;
;
},{"../utils/icons":17}],31:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _icons = require('../utils/icons');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WeekForecast = function () {
  function WeekForecast() {
    _classCallCheck(this, WeekForecast);

    this.host = document.createElement('div');
    this.host.classList.add('week-forecast');
  }

  _createClass(WeekForecast, [{
    key: 'getShortWeekday',
    value: function getShortWeekday(datetime) {
      var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      var date = new Date(datetime);
      return weekday[date.getDay()];
    }
  }, {
    key: 'render',
    value: function render(forecast) {
      this.host.classList.add('active');
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
},{"../utils/icons":17}],13:[function(require,module,exports) {
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

var _WeekForecast = require('./WeekForecast');

var _WeekForecast2 = _interopRequireDefault(_WeekForecast);

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
    this.DayForecast = new _DayForecast2.default();
    this.WeekForecast = new _WeekForecast2.default();
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
        _this2.processData();
      });
    }
  }, {
    key: 'processData',
    value: function processData() {
      this.DayForecast.render(this.state.data, 0);
      this.WeekForecast.render(this.state.data);
      // history.addToRecent(this.city);
      // history.renderRecent();
      // link.changeLink(this.city);
    }
  }, {
    key: 'render',
    value: function render() {
      this.SearchBar.render();
      this.host.appendChild(this.SearchBar.host);
      this.host.appendChild(this.DayForecast.host);
      this.host.appendChild(this.WeekForecast.host);
    }
  }]);

  return App;
}();

;

exports.default = App;
},{"./SearchBar":7,"./DayForecast":14,"./WeekForecast":31,"../utils/api":13,"../utils/index":8}],2:[function(require,module,exports) {
'use strict';

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _App2.default();
app.render();
},{"./components/App":6}],15:[function(require,module,exports) {

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
},{}]},{},[15,2])
//# sourceMappingURL=/dist/fe2cd0ec559fcd541e3231ee14ce3f9b.map