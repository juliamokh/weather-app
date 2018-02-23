import { events } from '../utils/index';

export default class InputField {
  constructor() {
    this.host = document.createElement('input');
    this.host.name = 'search';
    this.host.type = 'text';
    this.host.setAttribute('placeholder', 'Type location and press enter');
    this.host.setAttribute('required', '');
    this.host.setAttribute('autofocus', '');
    
    this.initAutocomplete();
  }

  initAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.host, { types: ['geocode'] });
    autocomplete.addListener('place_changed', this.onPlaceChanged);
  };
  
  onPlaceChanged() {
    const place = this.getPlace();
    console.log(place);
    if (!place.geometry) return;
    else {
      const location = {
        city: place.name,
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng()
      };
      events.publish('userInput', location);
    }
  }

  render() {
    return this.host;
  }
};
