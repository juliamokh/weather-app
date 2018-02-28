import Component from '../blackbox';
import { drawIcon } from '../utils/icons';
import { bindAll } from '../utils';

class WeekForecast extends Component {
  constructor() {
    super();
    
    bindAll(this, 'handleDayClick');
    this.host.addEventListener('click', this.handleDayClick);
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
      this.host.classList.add('week-forecast');
      
      let children = '';
      for (let i = 0; i < 7; i++) {
        const weekday = this.getShortWeekday(forecast.data[i].datetime);
        const icon = drawIcon(forecast.data[i].weather.code);
        const temp = this.tempConverter(forecast.data[i].temp);
  
        children += `
          <div class="day-forecast" id="${i}">
            <div class="day">${weekday}</div>
            <div>${icon}</div>
            <div class="temperature">${temp}°</div>
          </div>
        `;
      };
      return children;
    } else return '';
  }
};

export default WeekForecast;
