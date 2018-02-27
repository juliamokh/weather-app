import { events } from '../utils/index';
import { addToArray } from '../utils/index';
import { bindAll } from '../utils/index';

export default class RecentCities {
  constructor() {
    this.host = document.createElement('div');
    this.host.classList.add('recent-list');

    bindAll(this, 'handleCityClick');
    this.host.addEventListener('click', this.handleCityClick);
    // this.listenRecent();
  }

  get list() {
    return localStorage.getItem('recentCities') ? JSON.parse(localStorage.getItem('recentCities')) : [];
  }

  update(nextProps) {
    this.props = nextProps;
    return this.render();
  }
  
  // listenRecent() {
  //   events.subscribe('recent', location => this.addToRecent(location));
  // }

  handleCityClick(ev) {
    let target = ev.target;
    while (target != this) {
      if (target.tagName == 'LI') {
        const location = this.list[target.id];
        console.log(location);
        this.props.onCityClick(location);
        return;
      };
      target = target.parentNode;
    }
  }

  addToRecent(location) {
    let arr = addToArray(this.list, location);
    localStorage.setItem('recentCities', JSON.stringify(arr));
    return this.render();
  }

  render() {
    if (this.list.length) {
      this.host.classList.add('active');
      this.host.innerHTML = `
        <h2><i class="fas fa-history"></i> Recently viewed</h2>
        <ul id="recent"></ul>
      `;
      this.list.forEach((location, index) => {
        this.host.insertAdjacentHTML('beforeend', `<li id="${index}">${location.city}</li>`);   
      });    
    }
    return this.host;
  }
};
