import {events} from '../utils/index';

export default class SearchBar {
  constructor() {
    this.host = document.createElement('div');
    this.host.classList.add('search-bar-container');
    this.handleSubmit = this.handleSubmit.bind(this);
    this.host.addEventListener('submit', this.handleSubmit);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const city = ev.target.elements.search.value.trim();
    if (city.length) {
      events.publish('userInput', city);
    }
  }

  render() {
    this.host.innerHTML = `
      <form class="search-bar" onsubmit>
        <button class="btn-star" id="star" type="button"><i class="far fa-star"></i></button>
        <input name="search" type="text" placeholder="Type location and press enter" required>
        <button class="icon-search" type="submit"><i class="fas fa-search"></i></button>
        <select id="units">
          <option value="GC" selected>°C</option>
          <option value="FA">°F</option>
        </select>
      </form>
    `;
    return this.host;
  }
};
