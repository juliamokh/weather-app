import { drawIcon } from '../utils/icons';
import { events } from '../utils/index';
import { bindAll } from '../utils/index';

export default class WeekForecast {
  constructor() {
    this.host = document.createElement('div');
    this.host.classList.add('week-forecast');
    
    bindAll(this, 'handleDayClick');
    this.host.addEventListener('click', this.handleDayClick);
  }

  update(nextProps, forecast, units) {
    this.props = nextProps;
    return this.render(forecast, units);
  }

  getShortWeekday(datetime) {
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(datetime);
    return weekday[date.getDay()];
  }

  tempConverter(temp, units) {
    if (units === 'I') return Math.round((temp * 1.8) + 32);
    else return Math.round(temp);
  }

  handleDayClick(ev) {
    let target = ev.target;
    while (target != this) {
      if (target.className == 'day-forecast') {
        const day = target.id;
        this.props.onDayClick(day);
        return;
      }
      target = target.parentNode;
    }
  }

  render(forecast, units) {
    if (forecast.data) {
      this.host.classList.add('active');
      this.host.innerHTML = '';
      for (let i = 0; i < 7; i++) {
        const weekday = this.getShortWeekday(forecast.data[i].datetime);
        const icon = drawIcon(forecast.data[i].weather.code);
        const temp = this.tempConverter(forecast.data[i].temp, units);
  
        this.host.innerHTML += `
          <div class="day-forecast" id="${i}">
            <div class="day">${weekday}</div>
            <div>${icon}</div>
            <div class="temperature">${temp}°</div>
          </div>
        `;
      }
    };
    return this.host;
  }
};
