import Component from '../blackbox';

import SearchBar from './SearchBar';
import DayForecast from './DayForecast';
import WeekForecast from './WeekForecast';
import RecentCities from './RecentCities';
import FavoriteCities from './FavoriteCities';

import '../styles/reset.css';
import '../styles/app.css';

import { get } from '../utils/api';
import { bindAll, insert } from '../utils';

class App extends Component {
  constructor({ host }) {
    super();

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
    this.lists = document.createElement('div');
    this.lists.classList.add('lists');
    this.error = document.createElement('div');
    this.error.classList.add('error');
    
    this.SearchBar = new SearchBar;
    this.DayForecast = new DayForecast;
    this.WeekForecast = new WeekForecast;
    this.RecentCities = new RecentCities;
    this.FavoriteCities = new FavoriteCities;

    bindAll(this, 'listenLocation', 'listenUnitsChange', 'listenStarClick', 'listenDayClick'); 
    this.popLink();
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
        this.handleError();
        this.processData(data);
      })
      .catch(err => {
        console.log(`Request failed: ${err.message}`);
        this.handleError(err);
      }); 
  }

  handleError(err) {
    if (err) this.error.innerText = `Request failed: ${err.message}`;
    else this.error.innerText = ``;
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
    const { location: {address}, units, data:forecast } = this.state;

    return [
      this.error,
      this.insertChildren([
        this.SearchBar.update({ address,
          onSubmit: this.listenLocation,
          onUnitsChange: this.listenUnitsChange,
          onStarClick: this.listenStarClick }),
        this.DayForecast.update({ forecast, units, day: 0 }),
        this.WeekForecast.update({ onDayClick: this.listenDayClick, forecast, units })
      ], this.main),
      this.insertChildren([
        this.FavoriteCities.update({ onCityClick: this.listenLocation }),
        this.RecentCities.update({ onCityClick: this.listenLocation })
      ], this.lists)
    ];
  }
};

export default App;
