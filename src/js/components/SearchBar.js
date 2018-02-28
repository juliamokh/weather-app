import { initAutocomplete, bindAll, insert } from '../utils';

class SearchBar {
  constructor() {
    this.state = {
      isValid: true,
      units: 'GC',
    };
    this.props = {};

    this.host = document.createElement('div');
    this.host.classList.add('search-bar');

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.setAttribute('placeholder', 'Type location...');
    this.input.setAttribute('required', '');
    this.input.setAttribute('autofocus', '');

    bindAll(this, 'handleStarClick', 'handleUnitsChange', 'handleSubmit');

    this.host.addEventListener('click', this.handleStarClick);
    this.host.addEventListener('change', this.handleUnitsChange);

    initAutocomplete(this.input, this.handleSubmit);
  }

  updateState(nextState) {
    this.state = Object.assign({}, this.state, nextState);
    this.render();
  }

  update(nextProps) {
    this.props = Object.assign({}, this.props, nextProps);
    return this.render();
  }

  handleSubmit(place) {
    if (!place.geometry) {
      this.updateState({ isValid: false });
    } else {
      this.updateState({ isValid: true });
      const location = {
        address: place.formatted_address,
        city: place.name.split(' ')[0],
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng()
      };
      this.props.onSubmit(location);
    }
  }

  handleStarClick(ev) {
    let target = ev.target;
    while (target !== this.host) {
      if (target.className === 'btn-star') {
        this.props.onStarClick();
        return;
      }
      target = target.parentNode;
    }
  }

  handleUnitsChange(ev) {
    let target = ev.target;
    while (target !== this.host) {
      if (target.id === 'units') {
        const units = ev.target.value;
        this.updateState({ units: ev.target.value });
        this.props.onUnitsChange(units);
        return;
      }
      target = target.parentNode;
    }
  }

  render() {
    this.host.innerHTML = '';

    const { isValid } = this.state;
    isValid ? this.host.classList.remove('invalid') : this.host.classList.add('invalid');

    const { units } = this.state;

    const { address } = this.props;
    if (address) this.input.value = address;
  
    const btnStar = `<button class="btn-star" type="button" title="Add to favorite"><i class="far fa-star"></i></button>`;
    const iconSearch = `<div class="icon-search"><i class="fas fa-search"></i></div>`;
    const selectUnits = `
      <select id="units" title="Select units">
        <option value="GC" ${(units === 'GC') ? 'selected' : ''}>°C</option>
        <option value="FA" ${(units === 'FA') ? 'selected' : ''}>°F</option>
      </select>
    `;

    return insert(this.host, [btnStar, this.input, iconSearch, selectUnits]);
  }
};

export default SearchBar;
