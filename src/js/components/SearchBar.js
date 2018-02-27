import { events } from '../utils/index';
import { initAutocomplete } from '../utils/index';
import { bindAll } from '../utils/index';

class SearchBar {
  constructor() {
    this.props = {};
    this.state = {
      isValid: true,
      isCelcius: true,
    };

    this.host = document.createElement('div');
    this.host.classList.add('search-bar');

    this.input = document.createElement('input');
    this.input.name = 'search';
    this.input.type = 'text';
    this.input.setAttribute('placeholder', 'Type location and press enter');
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
      const location = {
        city: place.name.split(' ')[0],
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng()
      };
      console.log(location);
      this.props.onSubmit(location);
    }
  }

  handleStarClick(ev) {
    let target = ev.target;
    while (target != this.host) {
      if (target.className == 'btn-star') {
        this.props.onStarClick();
        return;
      }
      target = target.parentNode;
    }
  }

  handleUnitsChange(ev) {
    if (ev.target.id == 'units') {
      const units = ev.target.value;
      if (units === 'M') this.state.isCelcius = true;
      else this.state.isCelcius = false;
      this.props.onUnitsChange(units);
    }
  }

  render() {
    this.host.innerHTML = '';

    const { isValid } = this.state;
    if (!isValid) this.host.classList.add('invalid');

    const { city } = this.props;
    if (city) this.input.value = city;

    const { isCelcius } = this.state;
  
    const btnStar = `<button class="btn-star" type="button"><i class="far fa-star"></i></button>`;
    const iconSearch = `<div class="icon-search"><i class="fas fa-search"></i></div>`;
    const selecUnits = `
      <select id="units">
        <option value="M" ${isCelcius ? 'selected' : ''}>°C</option>
        <option value="I" ${isCelcius ? '' : 'selected'}>°F</option>
      </select>
    `;

    this.host.insertAdjacentHTML('beforeend', btnStar);
    this.host.insertAdjacentElement('beforeend', this.input);
    this.host.insertAdjacentHTML('beforeend', iconSearch);
    this.host.insertAdjacentHTML('beforeend', selecUnits);

    return this.host;
  }
};

export default SearchBar;
