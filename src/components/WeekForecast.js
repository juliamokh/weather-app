import { drawIcon } from '../utils/icons';

export default class WeekForecast {
  constructor() {
    this.host = document.createElement('div');
    this.host.classList.add('week-forecast');
  }

  getShortWeekday(datetime) {
    let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let date = new Date(datetime);
    return weekday[date.getDay()];
  }

  render(forecast) {
    this.host.classList.add('active');
    for (let i = 0; i < 7; i++) {
      this.host.innerHTML += `
        <div class="day-forecast" id="${i}">
          <div class="day">${this.getShortWeekday(forecast.data[i].datetime)}</div>
          <div>${drawIcon(forecast.data[i].weather.code)}</div>
          <div class="temperature">${forecast.data[i].temp}°</div>
        </div>
      `;
    }
    return this.host;
  }
};
