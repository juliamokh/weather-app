class Component {
  constructor(props) {
    this.props = props || {};
    this.state = {};
    this.host = null;
  }

  updateState(nextState) {
    this.state = Object.assign({}, this.state, nextState);
    this._render();
  }

  update(nextProps) {
    this.props = Object.assign({}, this.props, nextProps);
    return this._render();
  }

  _render() {
    this.host.innerHTML = '';

    const children = this.render();
    
    if (typeof children === 'string') {
      this.host.insertAdjacentHTML('beforeend', children)
    } else if (Array.isArray(children)) {
        children.forEach(elem => {
          (typeof elem === 'string') ? this.host.insertAdjacentHTML('beforeend', elem) : this.host.append(elem);
        });
    } else {
      this.host.append(elem);
    };

    return this.host;
  }

  render() {}
};

export default Component;
