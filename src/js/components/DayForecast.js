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

  tempConverter(temp, units) {
    if (units === 'I') return Math.round((temp * 1.8) + 32);
    else return Math.round(temp);
  }

  render(forecast, units, day = 0) {
    const city = forecast.city_name;
    const country = forecast.country_code;
    const weekday = this.getWeekday(forecast.data[day].datetime);
    const date = forecast.data[day].datetime;
    const wind = forecast.data[day].wind_spd;
    const humidity = forecast.data[day].rh;
    const icon = drawIcon(forecast.data[day].weather.code);
    const description = forecast.data[day].weather.description;
    const minTemp = this.tempConverter(forecast.data[day].min_temp, units);
    const maxTemp = this.tempConverter(forecast.data[day].max_temp, units);
    const temp = this.tempConverter(forecast.data[day].temp, units);

    this.host.classList.add('active');
    this.host.innerHTML = `
      <div class="city">${city}, ${country}</div>
      <div class="container">
        <div class="wrapper">
          <div class="current-day">${weekday}</div>
          <time class="date">${date}</time>
          <div class="wind">Wind ${wind} m/s</div>
          <div class="humidity"><i class="fas fa-tint"></i> ${humidity}%</div>
        </div>
        <div class="wrapper">
          <div>${icon}</div>
          <div class="weather">${description}</div>
        </div>
        <div class="wrapper">
          <div class="temperature">
            <div class="min_temperature"><i class="fas fa-long-arrow-alt-down"></i> ${minTemp}°</div>
            <div class="max_temperature"><i class="fas fa-long-arrow-alt-up"></i> ${maxTemp}°</div>
          </div>
          <div class="current-temperature">${temp}°</div>
        </div>
      </div>
    `;
    return this.host;
  }
};
