import Component from '../blackbox';
import { addToArray, bindAll } from '../utils';

class FavoriteCities extends Component {
  constructor() {
    super();

    this.host.classList.add('favorite-list');

    this.btn = document.createElement('button');
    this.btn.type = 'button';
    this.btn.title = 'Clear the list';
    this.btn.classList.add('btn-delete');

    bindAll(this, 'handleCityClick', 'handleDeleteClick');
    this.host.addEventListener('click', this.handleCityClick);
    this.btn.addEventListener('click', this.handleDeleteClick);
  }

  get list() {
    return localStorage.getItem('favoriteCities') ? JSON.parse(localStorage.getItem('favoriteCities')) : [];
  }

  addToFavorite(location) {
    const arr = addToArray(this.list, location);
    localStorage.setItem('favoriteCities', JSON.stringify(arr));
    this._render();
  }

  handleCityClick(ev) {
    if (ev.target.tagName === 'LI') {
      const location = this.list[ev.target.id];
      this.props.onCityClick(location);
    }
  }

  handleDeleteClick(ev) {
    localStorage.removeItem('favoriteCities');
    this._render();
  }

  render() {
    this.btn.innerHTML = `<i class="far fa-trash-alt"></i>`;

    let items = '';  
    if (this.list.length) {
      this.list.forEach((location, index) => {
        items += `<li id="${index}">${location.address}</li>`;  
      });  
    }

    return [
      `<h2><i class="far fa-star"></i> Favorite</h2>`,
      this.insertChildren(items, document.createElement('ul')),
      this.btn
    ];
  }
};

export default FavoriteCities;
