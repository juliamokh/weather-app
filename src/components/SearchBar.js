import { events } from '../utils/index';

export default class SearchBar {
  constructor() {
    this.host = document.createElement('div');
    this.host.classList.add('search-bar-container');
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUnitsChange = this.handleUnitsChange.bind(this);
    this.handleStar = this.handleStar.bind(this);
    this.host.addEventListener('submit', this.handleSubmit);
    this.host.addEventListener('change', this.handleUnitsChange);
    this.host.addEventListener('click', this.handleStar);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const city = ev.target.elements.search.value.trim();
    if (city.length) {
      events.publish('userInput', city);
    }
  }

  handleUnitsChange(ev) {
    if (ev.target.id == 'units') {
      const units = ev.target.value;
      events.publish('unitsChange', units);
    }
  }

  handleStar(ev) {
    if (ev.target.id == 'star') {
      events.publish('starClick');
    }
  }

  render() {
    this.host.innerHTML = `
      <form class="search-bar" onsubmit>
        <button class="btn-star" id="star" type="button"><i class="far fa-star"></i></button>
        <input name="search" id="search" type="text" placeholder="Type location and press enter" required>
        <button class="icon-search" type="submit"><i class="fas fa-search"></i></button>
        <select id="units">
          <option value="M" selected>°C</option>
          <option value="I">°F</option>
        </select>
      </form>
    `;
    return this.host;
  }
};
