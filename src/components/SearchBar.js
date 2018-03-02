import Component from '../blackbox';
import { initAutocomplete, bindAll } from '../utils';

class SearchBar extends Component {
  constructor() {
    super();
    
    this.state = {
      isValid: true,
      units: 'GC',
    };

    this.host.classList.add('search-bar');

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.setAttribute('placeholder', 'Type location...');
    this.input.setAttribute('required', '');
    this.input.setAttribute('autofocus', '');

    bindAll(this, 'handleStarClick', 'handleUnitsChange', 'handleSubmit');

    this.input.addEventListener('focus', (ev) => ev.target.select());
    this.host.addEventListener('click', this.handleStarClick);
    this.host.addEventListener('change', this.handleUnitsChange);

    initAutocomplete(this.input, this.handleSubmit);
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
    if (ev.target.className === 'btn-star') {
      this.props.onStarClick();
    }
  }

  handleUnitsChange(ev) {
    if (ev.target.id === 'units') {
      const units = ev.target.value;
      this.updateState({ units });
      this.props.onUnitsChange(units);
    }
  }

  render() {
    const { isValid, units } = this.state;
    isValid ? this.host.classList.remove('invalid') : this.host.classList.add('invalid');

    const { address } = this.props;
    if (address) this.input.value = address;
  
    return [
      `<button class="btn-star" type="button" title="Add to favorite"><i class="far fa-star"></i></button>`,
      this.input,
      `<div class="icon-search"><i class="fas fa-search"></i></div>`,
      `<select id="units" title="Select units">
        <option value="GC" ${(units === 'GC') ? 'selected' : ''}>°C</option>
        <option value="FA" ${(units === 'FA') ? 'selected' : ''}>°F</option>
      </select>`
    ];
  }
};

export default SearchBar;
