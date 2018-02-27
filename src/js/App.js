import SearchBar from './components/SearchBar';
import DayForecast from './components/DayForecast';
import WeekForecast from './components/WeekForecast';
import RecentCities from './components/RecentCities';
import FavoriteCities from './components/FavoriteCities';

import { get } from './utils/api';
import { events } from './utils/index';
import { bindAll } from './utils/index';

class App {
  constructor(props) {
    this.props = props || {};
    this.state = {
      city: this.getCityFromLink() || '',
      location: {},
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

    bindAll(this, 'listenUserInput', 'listenUnitsChange', 'listenStarClick', 'listenDayClick', 'listenCityClick');
    
    // this.getCityFromLink();
    this.popLink();
    // this.listenUserInput();
    // this.listenUnitsChange();
    // this.listenStarClick();
    // this.listenDayClick();
    // this.listenCityClick();
  }

  updateState(nextState) {
    this.state = Object.assign({}, this.state, nextState);
    this.render();
  }

  update(nextProps) {
    this.props = nextProps;
    return this.render();
  }

  // getCityFromLink() {
  //   let city = window.location.search.substring(1);
  //   if (city.length) {
  //     this.getCityForecast(city);
  //   }
  // }

  getCityFromLink() {
    let city = window.location.search.substring(6);
    if (city.length) {
      return city;
    }
  }

  popLink() {
    window.addEventListener('popstate', ev => {
      if (ev.state !== null) {
        this.getCityForecast(ev.state);
      } 
    });
  }

  listenUserInput(location) {
    this.state.location = location;
    this.getGeoForecast();
  }

  listenUnitsChange(units) {
    this.state.units = units;
    this.DayForecast.render(this.state.data, this.state.units);
    this.WeekForecast.render(this.state.data, this.state.units);
  }

  listenStarClick() {
    this.FavoriteCities.addToFavorite(this.state.location);
    // this.FavoriteCities.update(this.state.location);
  }

  listenDayClick(day) {
    this.DayForecast.render(this.state.data, this.state.units, day);
  }

  listenCityClick(location) {
    this.state.location = location;
    this.getGeoForecast();
  }

  getCityForecast(city = this.state.city) {
    const search = `&city=${city}`;
    this.getForecast(search);
  }

  getGeoForecast(lat = this.state.location.lat, lon = this.state.location.lon) {
    const search = `&lat=${lat}&lon=${lon}`;
    this.getForecast(search);
  }

  getForecast(search) {
    const path = `&units=${this.state.units}${search}`;
    get(path)
      .then(data => {
        this.state.data = data;
        this.processData();
      })
  }

  processData() {
    this.changeLink(this.state.location);
    this.SearchBar.update({ city: this.state.location.city });
    this.DayForecast.render(this.state.data, this.state.units);
    this.WeekForecast.render(this.state.data, this.state.units);
    this.RecentCities.addToRecent(this.state.location);
  }

  changeLink(location) {
    window.history.pushState(location, null, `?city=${location.city}`);
  }

  render() {
    this.main.innerHTML = '';
    this.aside.innerHTML = '';

    const { city } = this.state;

    this.main.appendChild(this.SearchBar.update({ 
        city,
        onSubmit: this.listenUserInput,
        onUnitsChange: this.listenUnitsChange,
        onStarClick: this.listenStarClick
      }));
    this.main.appendChild(this.DayForecast.host);
    this.main.appendChild(this.WeekForecast.update(
      { onDayClick: this.listenDayClick },
      this.state.data,
      this.state.units
    ));
    this.aside.appendChild(this.FavoriteCities.update({
      onCityClick: this.listenCityClick
    }));
    this.aside.appendChild(this.RecentCities.update({
      onCityClick: this.listenCityClick
    }));
  }
};

export default App;
