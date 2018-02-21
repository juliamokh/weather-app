export const events = {
  events: {},
  subscribe(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  unsubscribe(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  },
  publish(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => fn(data));
    }
  }
};

export function drawIcon(code) {
  let icon = '';
  switch(code) {
    case '200':
    case '201':
    case '202':
    case '230':
    case '231':
    case '232':
    case '233':
      icon = 'thunder';
      break;
    case '300':
    case '301':
    case '302':
    case '611':
    case '612':
      icon = 'rainy-7';
      break;
    case '500':
    case '520':
      icon = 'rainy-4';
      break;
    case '501':
    case '511':
      icon = 'rainy-5';
      break;
    case '502':
    case '522':
    case '900':
      icon = 'rainy-6';
      break;
    case '521':
      icon = 'rainy-3';
      break;
    case '600':
    case '610':
    case '621':
      icon = 'snowy-3';
      break;
    case '601':
      icon = 'snowy-5';
      break;
    case '602':
    case '622':
    case '623':
      icon = 'snowy-6';
      break;
    case '700':
    case '711':
    case '721':
    case '731':
    case '741':
    case '751':
      icon = 'cloudy-day-1';
      break;
    case '800':
      icon = 'day';
      break;
    case '801':
    case '802':
    case '803':
      icon = 'cloudy-day-2';
      break;
    case '804':
      icon = 'cloudy';
      break;
  };
  return '<img src="../img/' + icon + '.svg">';
};
