import SearchBar from './SearchBar';
import DayForecast from './DayForecast';

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
        // this.processData();
      });
  }

  processData() {
    // forecast.renderDayForecast(this.data, 0);
    // forecast.renderWeekForecast(this.data);
    // history.addToRecent(this.city);
    // history.renderRecent();
    // link.changeLink(this.city);
  }

  render() {
    this.host.appendChild(this.SearchBar.render());
  }
};

export default App;
