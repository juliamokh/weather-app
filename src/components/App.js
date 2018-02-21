import SearchBar from './SearchBar';
import DayForecast from './DayForecast';
import WeekForecast from './WeekForecast';

import { get } from '../utils/api';
import { events } from '../utils/index';

class App {
  constructor() {
    this.state = {
      city: '',
      units: 'M',
      data: {},
    };
    this.host = document.getElementById('root');
    this.SearchBar = new SearchBar;
    this.DayForecast = new DayForecast;
    this.WeekForecast = new WeekForecast;
    this.listenInput();
  }

  listenInput() {
    events.subscribe('userInput', (input) => {
      this.state.city = input;
      console.log(this.state.city);
      this.getForecast();
    })
  }

  getForecast() {
    const path = `&units=${this.state.units}&city=${this.state.city}`;
    get(path).then(data => {
        this.state.data = data;
        console.log(this.state.data);
        this.processData();
      });
  }

  processData() {
    this.DayForecast.render(this.state.data, 0);
    this.WeekForecast.render(this.state.data);
    // history.addToRecent(this.city);
    // history.renderRecent();
    // link.changeLink(this.city);
  }

  render() {
    this.SearchBar.render()
    this.host.appendChild(this.SearchBar.host);
    this.host.appendChild(this.DayForecast.host);
    this.host.appendChild(this.WeekForecast.host);
  }
};

export default App;
