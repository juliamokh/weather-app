'use strict'

const api = {
  baseUrl : 'https://api.weatherbit.io/v2.0/forecast/daily',
  key : '?key=ddb43221d2a548889fb0e23b1266b34c',
  days : '&days=7',
  endpoint : '&city='
};

const dom = {
  search : document.getElementById('search'),
  todayForecast : document.getElementById('today-forecast'),
  weekForecast : document.getElementById('week-forecast')
};

let forecast = {};

dom.search.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    getForecast();
  }
});

function getForecast() {
  let query = api.baseUrl + api.key + api.days + api.endpoint + dom.search.value;

  // fetch(query)
  //   .then(response => response.json())
  //   .then(data => {
  //     forecast = data;
  //     console.log(forecast);
  //     renderDayForecast(0);
  //     renderWeekForecast();
  //   });  

  fetch(query)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      forecast = data;
      console.log(forecast);
      renderDayForecast(0);
      renderWeekForecast()
    })
    .catch(error => console.log(error) 
    );       
};

function renderDayForecast(day) {
  let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let date = new Date(forecast.data[day].datetime);

  dom.todayForecast.classList.add('active');
  dom.todayForecast.innerHTML = '';
  let html =  '<div class="city">' + forecast.city_name + ', ' + forecast.country_code + '</div>' +
              '<div class="container"><div class="wrapper"><div class="current-day">' + weekday[date.getDay()] + '</div>' +
              '<time class="date" datetime="' + forecast.data[day].datetime + '">' + forecast.data[day].datetime + '</time>' +
              '<div class="wind">Wind ' + forecast.data[day].wind_spd + ' km/h</div>' +
              '<div class="humidity"><i class="fas fa-tint"></i> ' + forecast.data[day].rh + '%</div></div>' +
              '<div class="wrapper"><div><img src="img/' + renderIcon(day) + '.svg"></div>' +
              '<div class="weather">' + forecast.data[day].weather.description + '</div></div>' +
              '<div class="wrapper"><div class="temperature">' +
              '<div class="min_temperature"><i class="fas fa-long-arrow-alt-down"></i> ' + forecast.data[day].min_temp + '°</div>' +
              '<div class="max_temperature"><i class="fas fa-long-arrow-alt-up"></i> ' + forecast.data[day].max_temp + '°</div></div>' +
              '<div class="current-temperature">' + forecast.data[day].temp + '°</div></div></div>';
  dom.todayForecast.innerHTML = html;
};

function renderWeekForecast() {
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  dom.weekForecast.classList.add('active');
  dom.weekForecast.innerHTML = '';

  for (let i = 1; i < 7; i++) {
    let date = new Date(forecast.data[i].datetime);
    let html =  '<div class="day-forecast">' +
                '<div class="day">' + weekday[date.getDay()] + '</div>' +
                '<div><img src="img/' + renderIcon(i) + '.svg"></div>' +
                '<div class="temperature">' + forecast.data[i].temp + '°</div>' +
                '</div>';
    dom.weekForecast.insertAdjacentHTML('beforeend', html);
  };
};

function renderIcon(day) {
  switch(forecast.data[day].weather.code) {
    case '200':
    case '201':
    case '202':
    case '230':
    case '231':
    case '232':
    case '233':
      return 'thunder';
    case '300':
    case '301':
    case '302':
    case '611':
    case '612':
      return 'rainy-7';
    case '500':
    case '520':
      return 'rainy-4';
    case '501':
    case '511':
      return 'rainy-5';
    case '502':
    case '522':
    case '900':
      return 'rainy-6';
    case '521':
      return 'rainy-3';
    case '600':
    case '610':
    case '621':
      return 'snowy-3';
    case '601':
      return 'snowy-5';
    case '602':
    case '622':
    case '623':
      return 'snowy-6';
    case '700':
    case '711':
    case '721':
    case '731':
    case '741':
    case '751':
      return 'cloudy-day-1';
    case '800':
      return 'day';
    case '801':
    case '802':
    case '803':
      return 'cloudy-day-2';
    case '804':
      return 'cloudy';
  }
};
