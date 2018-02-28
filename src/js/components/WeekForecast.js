import { drawIcon } from '../utils/icons';
import { bindAll, insert } from '../utils';

export default class WeekForecast {
  constructor() {
    this.props = {};
    this.host = document.createElement('div');
    bindAll(this, 'handleDayClick');
    this.host.addEventListener('click', this.handleDayClick);
  }

  update(nextProps) {
    this.props = Object.assign({}, this.props, nextProps);
    return this.render();
  }

  getShortWeekday(datetime) {
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(datetime);
    return weekday[date.getDay()];
  }

  tempConverter(temp, units = this.props.units) {
    if (units === 'FA') return Math.round((temp * 1.8) + 32);
    else return Math.round(temp);
  }

  handleDayClick(ev) {
    let target = ev.target;
    while (target !== this.host) {
      if (target.className === 'day-forecast') {
        const day = target.id;
        this.props.onDayClick(day);
        return;
      }
      target = target.parentNode;
    }
  }

  render() {
    const { forecast } = this.props;

    if (forecast.data) {
      this.host.innerHTML = '';
      this.host.classList.add('week-forecast');

      for (let i = 0; i < 7; i++) {
        const weekday = this.getShortWeekday(forecast.data[i].datetime);
        const icon = drawIcon(forecast.data[i].weather.code);
        const temp = this.tempConverter(forecast.data[i].temp);
  
        const html = `
          <div class="day-forecast" id="${i}">
            <div class="day">${weekday}</div>
            <div>${icon}</div>
            <div class="temperature">${temp}°</div>
          </div>
        `;
        this.host = insert(this.host, html);
      }
    };
    return this.host;
  }
};
