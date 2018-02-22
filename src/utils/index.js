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

export function addToArray(arr, city) {
  arr.push(city);
  arr = [...new Set(arr)];
  if (arr.length === 11) arr.shift();
  return arr;
};
