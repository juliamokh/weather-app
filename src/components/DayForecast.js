import Component from '../blackbox';
import { drawIcon } from '../utils/icons';

class DayForecast extends Component {
  constructor() {
    super();
  }

  getWeekday(datetime) {
    let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let date = new Date(datetime);
    return weekday[date.getDay()];
  }

  tempConverter(temp, units = this.props.units) {
    if (units === 'FA') return Math.round((temp * 1.8) + 32);
    else return Math.round(temp);
  }

  render() {
    const { forecast, day } = this.props;

    if (forecast.data) {
      const { city_name, country_code } = forecast;
      const { datetime, wind_spd, rh, weather: {code, description}, min_temp, max_temp, temp } = forecast.data[day];

      if (!this.host.classList.contains('today-forecast')) {
        this.host.classList.add('today-forecast');
      };

      return `
        <div class="city">${city_name}, ${country_code}</div>
        <div class="container">
          <div class="wrapper">
            <div class="current-day">${this.getWeekday(datetime)}</div>
            <time class="date">${datetime}</time>
            <div class="wind">Wind ${wind_spd} m/s</div>
            <div class="humidity"><i class="fas fa-tint"></i> ${rh}%</div>
          </div>
          <div class="wrapper">
            <div>${drawIcon(code)}</div>
            <div class="weather">${description}</div>
          </div>
          <div class="wrapper">
            <div class="temperature">
              <div class="min_temperature"><i class="fas fa-long-arrow-alt-down"></i> ${this.tempConverter(min_temp)}°</div>
              <div class="max_temperature"><i class="fas fa-long-arrow-alt-up"></i> ${this.tempConverter(max_temp)}°</div>
            </div>
            <div class="current-temperature">${this.tempConverter(temp)}°</div>
          </div>
        </div>
      `;
    } else return '';
  }
};

export default DayForecast;
