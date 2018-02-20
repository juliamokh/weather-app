class LocationSearch {
  constructor() {
    this.state = {
      isValid : true,
    };
    this.host = document.createElement('div');
    this.host.classList.add('search-bar-container');
    this.host.addEventListener('submit', this.handleSubmit);

    this.city = null;
  }

  handleSubmit(e) {
    e.preventDefault();
    const city = e.target.elements.search.value.trim();
    if (city.length) {
      this.city = city;
      console.log('submit');
    }
    else {
      // this.updateState({ isValid : false });
      console.log('error');
    }
  }

  updateState(state) {
    this.state = state;
    this.render();
  }

  render() {
    const { isValid } = this.state;

    this.host.innerHTML = `
      <form class="search-bar">
        <button class="btn-star" id="star" type="button" ><i class="far fa-star"></i></button>
        <input name="search" type="text" placeholder="Type location and press enter">
        <button class="icon-search" type="submit"><i class="fas fa-search"></i></button>
        <select id="units">
          <option value="GC" selected>°C</option>
          <option value="FA">°F</option>
        </select>
      </form>
    `;

    console.log('render');

    return this.host;
  }
};

export default LocationSearch;
