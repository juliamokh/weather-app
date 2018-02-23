import { events } from '../utils/index';

export default class SelectUnits {
  constructor() {
    this.host = document.createElement('select');
    this.host.id = 'units';   
    
    this.handleUnitsChange = this.handleUnitsChange.bind(this);
    this.host.addEventListener('change', this.handleUnitsChange);
  }

  handleUnitsChange(ev) {
    if (ev.target.id == 'units') {
      const units = ev.target.value;
      events.publish('unitsChange', units);
    }
  }

  render() {
    this.host.innerHTML = `
      <option value="M" selected>°C</option>
      <option value="I">°F</option>
    `;
    return this.host;
  }
};
