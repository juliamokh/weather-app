import { events } from '../utils/index';

export default class ButtonStar {
  constructor() {
    this.host = document.createElement('button');
    this.host.classList.add('btn-star');
    this.host.type = 'button';
    
    this.handleStarClick = this.handleStarClick.bind(this);
    this.host.addEventListener('click', this.handleStarClick);
  }

  handleStarClick(ev) {
    events.publish('starClick');
  }

  render() {
    this.host.innerHTML = `<i class="far fa-star"></i>`;
    return this.host;
  }
};
