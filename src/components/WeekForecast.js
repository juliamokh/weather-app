import drawIcon from '../utils/icons';
import { events } from '../utils/index';

export default class WeekForecast {
  constructor() {
    this.host = document.createElement('div');
    this.host.classList.add('week-forecast');
    this.listenDay = this.listenDay.bind(this);
    this.host.addEventListener('click', this.listenDay);
  }

  getShortWeekday(datetime) {
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(datetime);
    return weekday[date.getDay()];
  }

  listenDay(ev) {
    let target = ev.target;
    while (target != this) {
      if (target.className == 'day-forecast') {
        const day = target.id;
        events.publish('listenDay', day);
        return;
      }
      target = target.parentNode;
    }
  }

  render(forecast) {
    this.host.classList.add('active');
    this.host.innerHTML = '';
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
