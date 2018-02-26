import { events } from '../utils/index';
import { initAutocomplete } from '../utils/index';

export default class InputField {
  constructor() {
    this.props = {};

    this.host = document.createElement('input');
    this.host.name = 'search';
    this.host.type = 'text';
    this.host.setAttribute('placeholder', 'Type location and press enter');
    this.host.setAttribute('required', '');
    this.host.setAttribute('autofocus', '');
    
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
    initAutocomplete(this.host, this.handlePlaceChange);
  }

  handlePlaceChange(location) {
    // this.props.onChange(location);
    console.log(location);
  }

  render() {
    return this.host;
  }
};
