import SearchBar from './SearchBar';
import DayForecast from './DayForecast';
import WeekForecast from './WeekForecast';
import RecentCities from './RecentCities';
import FavoriteCities from './FavoriteCities';

import get from '../utils/api';
import { events } from '../utils/index';
// import { responseExample } from '../utils/responseExample';

class App {
  constructor() {
    this.state = {
      city: '',
      units: 'M',
      data: {},
    };
    this.main = document.querySelector('main');
    this.aside = document.querySelector('aside');
    this.SearchBar = new SearchBar;
    this.DayForecast = new DayForecast;
    this.WeekForecast = new WeekForecast;
    this.RecentCities = new RecentCities;
    this.FavoriteCities = new FavoriteCities;
    this.getLink();
    this.popLink();
    this.listenInput();
    this.listenUnitsChange();
    this.listenStar();
    this.listenDay();
    this.listenCity();
  }

  listenInput() {
    events.subscribe('userInput', (input) => {
      this.state.city = input;
      console.log(this.state.city);
      this.getForecast();
    })
  }

  listenUnitsChange() {
    events.subscribe('unitsChange', (units) => {
      this.state.units = units;
      console.log(this.state.units);
    })
  }

  listenStar() {
    events.subscribe('starClick', () => {
      if (this.state.city.length) {
        events.publish('addToFavorite', this.state.city);
        this.FavoriteCities.render();
      }
    });
  }

  listenDay() {
    events.subscribe('listenDay', (day) => {
      this.DayForecast.render(this.state.data, day);
    })
  }

  listenCity() {
    events.subscribe('listenCity', (city) => {
      this.state.city = city;
      this.getForecast();
    })
  }

  changeLink(city) {
    window.history.pushState(city, null, `?${city}`);
  }

  popLink() {
    window.addEventListener('popstate', (ev) => {
      if (ev.state !== null) {
        this.listenLink(ev.state);
      } 
    });
  }

  getLink() {
    let search = window.location.search.substring(1);
    if (search.length) {
      this.listenLink(search);
    }
  }
  
  listenLink(city) {
    this.state.city = city;
    this.getForecast();
  }

  getForecast() {
    const path = `&units=${this.state.units}&city=${this.state.city}`;
    get(path)
      .then(data => {
        this.state.data = data;
        console.log(this.state.data);
        this.processData();
      });
  }

  processData() {
    this.DayForecast.render(this.state.data, 0);
    this.WeekForecast.render(this.state.data);
    this.RecentCities.render();
    this.changeLink(this.state.city);
  }

  render() {
    this.SearchBar.render();
    this.FavoriteCities.render();
    this.RecentCities.render();
    this.main.appendChild(this.SearchBar.host);
    this.main.appendChild(this.DayForecast.host);
    this.main.appendChild(this.WeekForecast.host);
    this.aside.appendChild(this.FavoriteCities.host);
    this.aside.appendChild(this.RecentCities.host);
  }
};

export default App;
