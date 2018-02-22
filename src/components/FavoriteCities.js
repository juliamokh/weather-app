import { events } from '../utils/index';
import { addToArray } from '../utils/index';

export default class FavoriteCities {
  constructor() {
    this.host = document.createElement('div');
    this.host.classList.add('favorite-list');
    this.listenCity = this.listenCity.bind(this);
    this.host.addEventListener('click', this.listenCity);
    this.listenStar();
  }

  get list() {
    return localStorage.getItem('favoriteCities') ? JSON.parse(localStorage.getItem('favoriteCities')) : [];
  }
  
  listenStar() {
    events.subscribe('addToFavorite', (city) => this.addToFavorite(city));
  }

  listenCity(ev) {
    let target = ev.target;
    while (target != this) {
      if (target.tagName == 'LI') {
        const city = target.textContent;
        events.publish('listenCity', city);
        return;
      }
      target = target.parentNode;
    }
  }

  addToFavorite(city) {
    let arr = addToArray(this.list, city);
    localStorage.setItem('favoriteCities', JSON.stringify(arr));
  }

  render() {
    if (this.list.length) {
      this.host.classList.add('active');
      this.host.innerHTML = `
        <h2><i class="far fa-star"></i> Favorite</h2>
        <ul id="favorite"></ul>
      `;
      this.list.forEach((item) => {
        this.host.insertAdjacentHTML('beforeend', `<li>${item}</li>`);   
      });    
    }
  }
};
