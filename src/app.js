'use strict'

window.onload = () => {
  link.getLink();
  search.listenInput();
  history.renderFavorite();
  history.renderRecent();
  app.listenStar();
  app.listenCity(dom.favorite);
  app.listenCity(dom.recent);
  app.listenDay();
  link.popLink();
};

const api = {
  baseUrl : 'https://api.weatherbit.io/v2.0/forecast/daily',
  key : '?key=ddb43221d2a548889fb0e23b1266b34c',
  days : '&days=7',
  units : '&units=',
  endpoint : '&city='
};

const dom = {
  star : document.getElementById('star'),
  search : document.getElementById('search'),
  units : document.getElementById('units'),
  todayForecast : document.getElementById('today-forecast'),
  weekForecast : document.getElementById('week-forecast'),
  favorite : document.getElementById('favorite'),
  recent : document.getElementById('recent')
};

let app = {
  city : '',
  data : {},
  get query() {
    return api.baseUrl + api.key + api.days + api.units + units.getUnits() + api.endpoint + this.city;
  },
  getInput(input) {
    this.city = input;
    this.getForecast();
  },
  getForecast() {
    fetch(this.query)
      .then(response => this.handleErrors(response))
      .then(data => {
        this.data = data;
        console.log(this.data);
        this.processData();
      })
      .catch(err => console.log(err));       
  },
  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  },
  processData() {
    forecast.renderDayForecast(this.data, 0);
    forecast.renderWeekForecast(this.data);
    history.addToRecent(this.city);
    history.renderRecent();
    link.changeLink(this.city);
  },
  listenStar() {
    dom.star.addEventListener('click', () => {
      history.addToFavorite(this.city);
      history.renderFavorite();
    });
  },
  listenDay() {
    dom.weekForecast.addEventListener('click', (e) => {
      let target = e.target;
      while (target != this) {
        if (target.className == 'day-forecast') {
          let day = target.id;
          forecast.renderDayForecast(this.data, day);
          return;
        }
        target = target.parentNode;
      }
    });
  },
  listenCity(list) {
    list.addEventListener('click', (e) => {
      let target = e.target;
      while (target != this) {
        if (target.tagName == 'LI') {
          this.city = target.textContent;
          this.getForecast();
          return;
        }
        target = target.parentNode;
      }
    });
  },
  listenLink(city) {
    this.city = city;
    this.getForecast();
  }
};

let search = {
  listenInput() {
    dom.search.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        if (this.isInputEmpty()) return;
        else {
          app.getInput(dom.search.value);
        }
      }
    });
  },
  isInputEmpty() {
    if (dom.search.value.length === 0) return true;
  }
};

let forecast = {
  renderDayForecast(forecast, day) {
    dom.todayForecast.classList.add('active');
    dom.todayForecast.innerHTML = '';
    let html = `
      <div class="city">${forecast.city_name}, ${forecast.country_code}</div>
      <div class="container">
        <div class="wrapper">
          <div class="current-day">${this.getWeekday(forecast.data[day].datetime)}</div>
          <time class="date">${forecast.data[day].datetime}</time>
          <div class="wind">Wind ${forecast.data[day].wind_spd} ${units.getSpeedUnits()}</div>
          <div class="humidity"><i class="fas fa-tint"></i> ${forecast.data[day].rh}%</div>
        </div>
        <div class="wrapper">
          <div>${this.drawIcon(forecast.data[day].weather.code)}</div>
          <div class="weather">${forecast.data[day].weather.description}</div>
        </div>
        <div class="wrapper">
          <div class="temperature">
            <div class="min_temperature"><i class="fas fa-long-arrow-alt-down"></i> ${forecast.data[day].min_temp}°</div>
            <div class="max_temperature"><i class="fas fa-long-arrow-alt-up"></i> ${forecast.data[day].max_temp}°</div>
          </div>
          <div class="current-temperature">${forecast.data[day].temp}°</div>
        </div>
      </div>
    `;
    dom.todayForecast.insertAdjacentHTML('beforeend', html);
  },
  renderWeekForecast(forecast) {
    dom.weekForecast.classList.add('active');
    dom.weekForecast.innerHTML = '';
    for (let i = 0; i < 7; i++) {
      let html = `
        <div class="day-forecast" id="${i}">
          <div class="day">${this.getShortWeekday(forecast.data[i].datetime)}</div>
          <div>${this.drawIcon(forecast.data[i].weather.code)}</div>
          <div class="temperature">${forecast.data[i].temp}°</div>
        </div>
      `;
      dom.weekForecast.insertAdjacentHTML('beforeend', html);
    };
  },
  getWeekday(datetime) {
    let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let date = new Date(datetime);
    return weekday[date.getDay()];
  },
  getShortWeekday(datetime) {
    let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let date = new Date(datetime);
    return weekday[date.getDay()];
  },
  drawIcon(weatherCode) {
    let icon = '';
    switch(weatherCode) {
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

let units = {
  isCelciusSelected() {
    let value = dom.units.options[dom.units.selectedIndex].value;
    if (value === 'GC') return true;
    else return false;
  },
  getUnits() {
    if (this.isCelciusSelected()) return 'M';
    else return 'I';
  },
  getSpeedUnits() {
    if (this.isCelciusSelected()) return 'm/s';
    else return 'mph';
  }
};

let history = {
  get recentCities() {
    return localStorage.getItem('recentCities') ? JSON.parse(localStorage.getItem('recentCities')) : [];
  },
  get favoriteCities() {
    return localStorage.getItem('favoriteCities') ? JSON.parse(localStorage.getItem('favoriteCities')) : [];
  },
  addToRecent(city) {
    let arr = this.addToArray(this.recentCities, city);
    localStorage.setItem('recentCities', JSON.stringify(arr));
  },
  addToFavorite(city) {
    let arr = this.addToArray(this.favoriteCities, city);
    localStorage.setItem('favoriteCities', JSON.stringify(arr));
  },
  renderRecent() {
    this.renderList(this.recentCities, dom.recent);
  },
  renderFavorite() {
    this.renderList(this.favoriteCities, dom.favorite);
  },
  renderList(list, parent) {
    parent.innerHTML = '';
    list.forEach((item) => {
      let html = `<li>${item}</li>`;
      parent.insertAdjacentHTML('beforeend', html);   
    });    
    parent.parentElement.classList.add('active');
  },
  addToArray(arr, city) {
    arr.push(city);
    arr = [...new Set(arr)];
    if (arr.length === 11) arr.shift();
    return arr;
  }
};

let link = {
  changeLink(city) {
    window.history.pushState(city, null, '?' + city);
  },
  popLink() {
    window.addEventListener('popstate', (e) => {
      if (e.state !== null) app.listenLink(e.state);
    });
  },
  getLink() {
    let search = window.location.search;
    if (search.length > 1) app.listenLink(search.substring(1));
  }
};
