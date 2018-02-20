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
})({14:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocationSearch = function () {
  function LocationSearch() {
    _classCallCheck(this, LocationSearch);

    this.state = {
      isValid: true
    };
    this.host = document.getElementById('search-bar-container');
    this.host.addEventListener('submit', this.handleSubmit);
  }

  _createClass(LocationSearch, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      var city = e.target.elements.search.value.trim();
      if (city.length) {} else {
        this.updateState({ isValid: false });
      }
    }
  }, {
    key: 'updateState',
    value: function updateState(state) {
      this.state = state;
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      this.host.innerHTML = '\n    <form class="search-bar">\n      <button class="btn-star" id="star" type="button" ><i class="far fa-star"></i></button>\n      <input name="search" type="text" placeholder="Type location and press enter">\n      <button class="icon-search" type="submit"><i class="fas fa-search"></i></button>\n      <select id="units">\n        <option value="GC" selected>\xB0C</option>\n        <option value="FA">\xB0F</option>\n      </select>\n    </form>\n    ';
      console.log('render');
      console.log(this.host.innerHTML);
      return this.host;
    }
  }]);

  return LocationSearch;
}();

;

exports.default = LocationSearch;
},{}],6:[function(require,module,exports) {
'use strict';

var _LocationSearch = require('./components/LocationSearch');

var _LocationSearch2 = _interopRequireDefault(_LocationSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

window.onload = function () {
  // link.getLink();
  // search.listenInput();
  // history.renderFavorite();
  // history.renderRecent();
  // app.listenStar();
  // app.listenCity(dom.favorite);
  // app.listenCity(dom.recent);
  // app.listenDay();
  // link.popLink();

  var form = new _LocationSearch2.default();
  form.render();
};

var api = {
  baseUrl: 'https://api.weatherbit.io/v2.0/forecast/daily',
  key: '?key=ddb43221d2a548889fb0e23b1266b34c',
  days: '&days=7',
  units: '&units=',
  endpoint: '&city='
};

var dom = {
  star: document.getElementById('star'),
  search: document.getElementById('search'),
  units: document.getElementById('units'),
  todayForecast: document.getElementById('today-forecast'),
  weekForecast: document.getElementById('week-forecast'),
  favorite: document.getElementById('favorite'),
  recent: document.getElementById('recent')
};

var app = {
  city: '',
  data: {},
  get query() {
    return api.baseUrl + api.key + api.days + api.units + units.getUnits() + api.endpoint + this.city;
  },
  getInput: function getInput(input) {
    this.city = input;
    this.getForecast();
  },
  getForecast: function getForecast() {
    var _this = this;

    fetch(this.query).then(function (response) {
      return _this.handleErrors(response);
    }).then(function (data) {
      _this.data = data;
      console.log(_this.data);
      _this.processData();
    }).catch(function (err) {
      return console.log(err);
    });
  },
  handleErrors: function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  },
  processData: function processData() {
    forecast.renderDayForecast(this.data, 0);
    forecast.renderWeekForecast(this.data);
    history.addToRecent(this.city);
    history.renderRecent();
    link.changeLink(this.city);
  },
  listenStar: function listenStar() {
    var _this2 = this;

    dom.star.addEventListener('click', function () {
      history.addToFavorite(_this2.city);
      history.renderFavorite();
    });
  },
  listenDay: function listenDay() {
    var _this3 = this;

    dom.weekForecast.addEventListener('click', function (e) {
      var target = e.target;
      while (target != _this3) {
        if (target.className == 'day-forecast') {
          var day = target.id;
          forecast.renderDayForecast(_this3.data, day);
          return;
        }
        target = target.parentNode;
      }
    });
  },
  listenCity: function listenCity(list) {
    var _this4 = this;

    list.addEventListener('click', function (e) {
      var target = e.target;
      while (target != _this4) {
        if (target.tagName == 'LI') {
          _this4.city = target.textContent;
          _this4.getForecast();
          return;
        }
        target = target.parentNode;
      }
    });
  },
  listenLink: function listenLink(city) {
    this.city = city;
    this.getForecast();
  }
};

var search = {
  listenInput: function listenInput() {
    var _this5 = this;

    dom.search.addEventListener('keypress', function (e) {
      if (e.keyCode === 13) {
        if (_this5.isInputEmpty()) return;else {
          app.getInput(dom.search.value);
        }
      }
    });
  },
  isInputEmpty: function isInputEmpty() {
    if (dom.search.value.length === 0) return true;
  }
};

var forecast = {
  renderDayForecast: function renderDayForecast(forecast, day) {
    dom.todayForecast.classList.add('active');
    dom.todayForecast.innerHTML = '';
    var html = '\n      <div class="city">' + forecast.city_name + ', ' + forecast.country_code + '</div>\n      <div class="container">\n        <div class="wrapper">\n          <div class="current-day">' + this.getWeekday(forecast.data[day].datetime) + '</div>\n          <time class="date">' + forecast.data[day].datetime + '</time>\n          <div class="wind">Wind ' + forecast.data[day].wind_spd + ' ' + units.getSpeedUnits() + '</div>\n          <div class="humidity"><i class="fas fa-tint"></i> ' + forecast.data[day].rh + '%</div>\n        </div>\n        <div class="wrapper">\n          <div>' + this.drawIcon(forecast.data[day].weather.code) + '</div>\n          <div class="weather">' + forecast.data[day].weather.description + '</div>\n        </div>\n        <div class="wrapper">\n          <div class="temperature">\n            <div class="min_temperature"><i class="fas fa-long-arrow-alt-down"></i> ' + forecast.data[day].min_temp + '\xB0</div>\n            <div class="max_temperature"><i class="fas fa-long-arrow-alt-up"></i> ' + forecast.data[day].max_temp + '\xB0</div>\n          </div>\n          <div class="current-temperature">' + forecast.data[day].temp + '\xB0</div>\n        </div>\n      </div>\n    ';
    dom.todayForecast.insertAdjacentHTML('beforeend', html);
  },
  renderWeekForecast: function renderWeekForecast(forecast) {
    dom.weekForecast.classList.add('active');
    dom.weekForecast.innerHTML = '';
    for (var i = 0; i < 7; i++) {
      var html = '\n        <div class="day-forecast" id="' + i + '">\n          <div class="day">' + this.getShortWeekday(forecast.data[i].datetime) + '</div>\n          <div>' + this.drawIcon(forecast.data[i].weather.code) + '</div>\n          <div class="temperature">' + forecast.data[i].temp + '\xB0</div>\n        </div>\n      ';
      dom.weekForecast.insertAdjacentHTML('beforeend', html);
    };
  },
  getWeekday: function getWeekday(datetime) {
    var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var date = new Date(datetime);
    return weekday[date.getDay()];
  },
  getShortWeekday: function getShortWeekday(datetime) {
    var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var date = new Date(datetime);
    return weekday[date.getDay()];
  },
  drawIcon: function drawIcon(weatherCode) {
    var icon = '';
    switch (weatherCode) {
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
    return '<img src="img/' + icon + '.svg">';
  }
};

var units = {
  isCelciusSelected: function isCelciusSelected() {
    var value = dom.units.options[dom.units.selectedIndex].value;
    if (value === 'GC') return true;else return false;
  },
  getUnits: function getUnits() {
    if (this.isCelciusSelected()) return 'M';else return 'I';
  },
  getSpeedUnits: function getSpeedUnits() {
    if (this.isCelciusSelected()) return 'm/s';else return 'mph';
  }
};

var history = {
  get recentCities() {
    return localStorage.getItem('recentCities') ? JSON.parse(localStorage.getItem('recentCities')) : [];
  },
  get favoriteCities() {
    return localStorage.getItem('favoriteCities') ? JSON.parse(localStorage.getItem('favoriteCities')) : [];
  },
  addToRecent: function addToRecent(city) {
    var arr = this.addToArray(this.recentCities, city);
    localStorage.setItem('recentCities', JSON.stringify(arr));
  },
  addToFavorite: function addToFavorite(city) {
    var arr = this.addToArray(this.favoriteCities, city);
    localStorage.setItem('favoriteCities', JSON.stringify(arr));
  },
  renderRecent: function renderRecent() {
    this.renderList(this.recentCities, dom.recent);
  },
  renderFavorite: function renderFavorite() {
    this.renderList(this.favoriteCities, dom.favorite);
  },
  renderList: function renderList(list, parent) {
    parent.innerHTML = '';
    list.forEach(function (item) {
      var html = '<li>' + item + '</li>';
      parent.insertAdjacentHTML('beforeend', html);
    });
    parent.parentElement.classList.add('active');
  },
  addToArray: function addToArray(arr, city) {
    arr.push(city);
    arr = [].concat(_toConsumableArray(new Set(arr)));
    if (arr.length === 11) arr.shift();
    return arr;
  }
};

var link = {
  changeLink: function changeLink(city) {
    window.history.pushState(city, null, '?' + city);
  },
  popLink: function popLink() {
    window.addEventListener('popstate', function (e) {
      if (e.state !== null) app.listenLink(e.state);
    });
  },
  getLink: function getLink() {
    var search = window.location.search;
    if (search.length > 1) app.listenLink(search.substring(1));
  }
};
},{"./components/LocationSearch":14}],21:[function(require,module,exports) {

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '52715' + '/');
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
},{}]},{},[21,6])
//# sourceMappingURL=/dist/22138a7f30c9f8d933ee822dced0079f.map