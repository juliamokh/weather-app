import SearchBar from './components/SearchBar';
import DayForecast from './components/DayForecast';
import WeekForecast from './components/WeekForecast';
import RecentCities from './components/RecentCities';
import FavoriteCities from './components/FavoriteCities';

import '../css/reset.css';
import '../css/style.css';

import { get } from './utils/api';
import { bindAll, insert } from './utils';

class App {
  constructor({ host }) {
    this.props = {};
    this.state = {
      location: {
        address: this.getCityFromLink() || '',
        city: '',
        lat: '',
        lon: '',
      },
      units: 'GC',
      data: {},
    };

    this.host = host;
    this.main = document.createElement('div');
    this.main.classList.add('page-content')
    this.aside = document.createElement('div');
    this.aside.classList.add('lists');
    
    this.SearchBar = new SearchBar;
    this.DayForecast = new DayForecast;
    this.WeekForecast = new WeekForecast;
    this.RecentCities = new RecentCities;
    this.FavoriteCities = new FavoriteCities;

    bindAll(this, 'listenLocation', 'listenUnitsChange', 'listenStarClick', 'listenDayClick'); 
    this.popLink();
  }

  updateState(nextState) {
    this.state = Object.assign({}, this.state, nextState);
    this.render();
  }

  update(nextProps) {
    this.props = nextProps;
    return this.render();
  }

  getCityFromLink() {
    let city = window.location.search.substring(6);
    if (city.length) return city;
  }

  popLink() {
    window.addEventListener('popstate', ev => {
      if (ev.state !== null) {
        this.state.location = ev.state;
        this.getGeoForecast();
      } 
    });
  }

  listenLocation(location) {
    this.state.location = location;
    this.getGeoForecast();
  }

  listenUnitsChange(units) {
    this.updateState({ units });
  }

  listenStarClick() {
    if (this.state.location.city) {
      this.FavoriteCities.addToFavorite(this.state.location);
    }
  }

  listenDayClick(day) {
    this.DayForecast.update({ day });
  }

  getGeoForecast(lat = this.state.location.lat, lon = this.state.location.lon) {
    const search = `&lat=${lat}&lon=${lon}`;
    this.getForecast(search);
  }

  getForecast(search) {
    get(search)
      .then(data => {
        this.processData(data);
      })
  }

  processData(data) {
    this.changeLink();
    this.RecentCities.addToRecent(this.state.location);
    this.updateState({ data });
  }

  changeLink(location = this.state.location) {
    window.history.pushState(location, null, `?city=${location.city}`);
  }

  render() {
    this.host.innerHTML = '';
    this.main.innerHTML = '';
    this.aside.innerHTML = '';

    const { location: {address}, units, data:forecast } = this.state;

    this.SearchBar.update({ address,
      onSubmit: this.listenLocation,
      onUnitsChange: this.listenUnitsChange,
      onStarClick: this.listenStarClick });
    this.DayForecast.update({ forecast, units, day: 0 });
    this.WeekForecast.update({ onDayClick: this.listenDayClick, forecast, units });
    this.FavoriteCities.update({ onCityClick: this.listenLocation });
    this.RecentCities.update({ onCityClick: this.listenLocation });

    this.host = insert(this.host, [
      insert(this.main, [this.SearchBar.host, this.DayForecast.host, this.WeekForecast.host]),
      insert(this.aside, [this.FavoriteCities.host, this.RecentCities.host])
    ]);

    return this.host;
  }
};

export default App;
