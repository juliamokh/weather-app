import { addToArray, bindAll, insert } from '../utils';

class RecentCities {
  constructor() {
    this.props = {};
    
    this.host = document.createElement('div');
    this.host.classList.add('recent-list');

    this.btn = document.createElement('button');
    this.btn.type = 'button';
    this.btn.title = 'Clear the list';
    this.btn.classList.add('btn-delete');

    bindAll(this, 'handleCityClick', 'handleDeleteClick');
    this.host.addEventListener('click', this.handleCityClick);
    this.btn.addEventListener('click', this.handleDeleteClick);
  }

  get list() {
    return localStorage.getItem('recentCities') ? JSON.parse(localStorage.getItem('recentCities')) : [];
  }

  update(nextProps) {
    this.props = nextProps;
    return this.render();
  }

  addToRecent(location) {
    let arr = addToArray(this.list, location);
    localStorage.setItem('recentCities', JSON.stringify(arr));
    return this.render();
  }

  handleCityClick(ev) {
    let target = ev.target;
    while (target !== this.host) {
      if (target.tagName === 'LI') {
        const location = this.list[target.id];
        this.props.onCityClick(location);
        return;
      };
      target = target.parentNode;
    }
  }

  handleDeleteClick(ev) {
    localStorage.removeItem('recentCities');
    this.render();
  }

  render() {
    this.host.innerHTML = `<h2><i class="fas fa-history"></i> Recently viewed</h2>`;
    this.btn.innerHTML = `<i class="far fa-trash-alt"></i>`;

    const list = document.createElement('ul');
    let items = '';
    
    if (this.list.length) {
      this.list.forEach((location, index) => {
        items += `<li id="${index}">${location.address}</li>`;   
      });    
    };
    
    this.host = insert(this.host, [insert(list, items), this.btn]);

    return this.host;
  }
};

export default RecentCities;
