import LocationSearch from './src/components/LocationSearch';

class App {
  constructor() {
    this.LocationSearch = new LocationSearch;
  }

  render() {
    this.LocationSearch.render();
    document.getElementById('page-content').appendChild(this.LocationSearch.host);
  }
};

export default App;
