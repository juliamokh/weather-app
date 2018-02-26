import { drawIcon } from '../utils/icons';

export default class DayForecast {
  constructor() {
    this.host = document.createElement('div');
    this.host.classList.add('today-forecast');
  }

  getWeekday(datetime) {
    let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let date = new Date(datetime);
    return weekday[date.getDay()];
  }

  getSpeedUnits(units) {
    if (units === 'M') return 'm/s';
    if (units === 'I') return 'mph';
  }

  render(forecast, units, day = 0) {
    this.host.classList.add('active');
    this.host.innerHTML = `
      <div class="city">${forecast.city_name}, ${forecast.country_code}</div>
      <div class="container">
        <div class="wrapper">
          <div class="current-day">${this.getWeekday(forecast.data[day].datetime)}</div>
          <time class="date">${forecast.data[day].datetime}</time>
          <div class="wind">Wind ${forecast.data[day].wind_spd} ${this.getSpeedUnits(units)}</div>
          <div class="humidity"><i class="fas fa-tint"></i> ${forecast.data[day].rh}%</div>
        </div>
        <div class="wrapper">
          <div>${drawIcon(forecast.data[day].weather.code)}</div>
          <div class="weather">${forecast.data[day].weather.description}</div>
        </div>
        <div class="wrapper">
          <div class="temperature">
            <div class="min_temperature"><i class="fas fa-long-arrow-alt-down"></i> ${Math.round(forecast.data[day].min_temp)}°</div>
            <div class="max_temperature"><i class="fas fa-long-arrow-alt-up"></i> ${Math.round(forecast.data[day].max_temp)}°</div>
          </div>
          <div class="current-temperature">${Math.round(forecast.data[day].temp)}°</div>
        </div>
      </div>
    `;
    return this.host;
  }
};