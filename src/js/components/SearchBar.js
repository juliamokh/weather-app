import ButtonStar from './ButtonStar';
import InputField from './InputField';
import SelectUnits from './SelectUnits';

import { events } from '../utils/index';

class SearchBar {
  constructor(props) {
    this.host = document.createElement('form');
    this.host.classList.add('search-bar');

    this.icon = document.createElement('div');
    this.icon.classList.add('icon-search'); 
    
    this.ButtonStar = new ButtonStar;
    this.InputField = new InputField;
    this.SelectUnits = new SelectUnits;
    
    this.host.addEventListener('submit', this.handleSubmit);
  }

  handleSubmit(ev) {
    ev.preventDefault();
  }

  render() {
    this.icon.innerHTML = `<i class="fas fa-search"></i>`;
    this.host.appendChild(this.ButtonStar.render());
    this.host.appendChild(this.InputField.render());
    this.host.appendChild(this.icon);
    this.host.appendChild(this.SelectUnits.render());
    return this.host;
  }
};

export default SearchBar;
