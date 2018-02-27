import { events } from '../utils/index';
import { addToArray } from '../utils/index';
import { bindAll } from '../utils/index';

export default class FavoriteCities {
  constructor() {
    this.props = {};

    this.host = document.createElement('div');
    this.host.classList.add('favorite-list');

    bindAll(this, 'handleCityClick');
    this.host.addEventListener('click', this.handleCityClick);
    // this.listenFavorite();
  }

  get list() {
    return localStorage.getItem('favoriteCities') ? JSON.parse(localStorage.getItem('favoriteCities')) : [];
  }

  update(nextProps) {
    this.props = nextProps;
    return this.render();
  }
  
  // listenFavorite() {
  //   events.subscribe('favorite', location => this.addToFavorite(location));
  // }

  handleCityClick(ev) {
    let target = ev.target;
    while (target != this) {
      if (target.tagName == 'LI') {
        const location = this.list[target.id];
        this.props.onCityClick(location);
        return;
      };
      target = target.parentNode;
    }
  }

  addToFavorite(location) {
    let arr = addToArray(this.list, location);
    localStorage.setItem('favoriteCities', JSON.stringify(arr));
    this.render();
  }

  render() {
    if (this.list.length) {
      this.host.classList.add('active');
      this.host.innerHTML = `
        <h2><i class="far fa-star"></i> Favorite</h2>
        <ul id="favorite"></ul>
      `;
      this.list.forEach((location, index) => {
        this.host.insertAdjacentHTML('beforeend', `<li id="${index}">${location.city}</li>`);  
      });    
    }
    return this.host;
  }
};
