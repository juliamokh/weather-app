import { events } from '../utils/index';
import { addToArray } from '../utils/index';

export default class RecentCities {
  constructor() {
    this.host = document.createElement('div');
    this.host.classList.add('recent-list');
    this.listenCity = this.listenCity.bind(this);
    this.host.addEventListener('click', this.listenCity);
    this.listenInput()
  }

  get list() {
    return localStorage.getItem('recentCities') ? JSON.parse(localStorage.getItem('recentCities')) : [];
  }
  
  listenInput() {
    events.subscribe('userInput', (input) => this.addToRecent(input));
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

  addToRecent(city) {
    let arr = addToArray(this.list, city);
    localStorage.setItem('recentCities', JSON.stringify(arr));
  }

  render() {
    if (this.list.length) {
      this.host.classList.add('active');
      this.host.innerHTML = `
        <h2><i class="fas fa-history"></i> Recently viewed</h2>
        <ul id="recent"></ul>
      `;
      this.list.forEach((item) => {
        this.host.insertAdjacentHTML('beforeend', `<li>${item}</li>`);   
      });    
    }
  }
};
