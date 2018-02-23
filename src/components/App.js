import SearchBar from './SearchBar';
import DayForecast from './DayForecast';
import WeekForecast from './WeekForecast';
import RecentCities from './RecentCities';
import FavoriteCities from './FavoriteCities';

import { get } from '../utils/api';
import { events } from '../utils/index';

export default class App {
  constructor() {
    this.state = {
      city: '',
      lat: '',
      lon: '',
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
    
    this.getCityFromLink();
    this.popLink();
    this.listenUserInput();
    this.listenUnitsChange();
    this.listenStarClick();
    this.listenDayClick();
    this.listenCityClick();
  }

  getCityFromLink() {
    let city = window.location.search.substring(1);
    if (city.length) {
      this.getCityForecast(city);
    }
  }

  popLink() {
    window.addEventListener('popstate', ev => {
      if (ev.state !== null) {
        this.getCityForecast(ev.state);
      } 
    });
  }

  listenUserInput() {
    events.subscribe('userInput', location => {
      this.state.lat = location.lat;
      this.state.lon = location.lon;
      this.getGeoForecast();
    })
  }

  listenUnitsChange() {
    events.subscribe('unitsChange', units => {
      this.state.units = units;
    })
  }

  listenStarClick() {
    events.subscribe('starClick', () => {
      if (this.state.city.length) {
        events.publish('favorite', {
          city: this.state.city, 
          lat: this.state.lat, 
          lon: this.state.lon
        });
        this.FavoriteCities.render();
      }
    });
  }

  listenDayClick() {
    events.subscribe('dayClick', day => {
      this.DayForecast.render(this.state.data, this.state.units, day);
    })
  }

  listenCityClick() {
    events.subscribe('cityClick', location => {
      if (location.lat.length && location.lon.length) {
        this.getGeoForecast(location.lat, location.lon);
      } 
      else {
        this.getCityForecast(location.city);
      }
    })
  }

  getCityForecast(city = this.state.city) {
    const search = `&city=${city}`;
    this.getForecast(search);
  }

  getGeoForecast(lat = this.state.lat, lon = this.state.lon) {
    const search = `&lat=${lat}&lon=${lon}`;
    this.getForecast(search);
  }

  getForecast(search) {
    const path = `&units=${this.state.units}${search}`;
    get(path)
      .then(data => {
        this.state.data = data;
        this.state.city = data.city_name;
        this.processData();
      })
  }

  processData() {
    this.changeLink(this.state.city);
    this.DayForecast.render(this.state.data, this.state.units);
    this.WeekForecast.render(this.state.data);
    events.publish('recent', {
      city: this.state.city, 
      lat: this.state.lat, 
      lon: this.state.lon
    });
    this.RecentCities.render();
  }

  changeLink(city) {
    window.history.pushState(city, null, `?${city}`);
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
