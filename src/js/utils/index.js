export const events = {
  events: {},
  subscribe(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  unsubscribe(eventName, fn) {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i++) {
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

export function initAutocomplete(input, callback) {
  const autocomplete = new google.maps.places.Autocomplete(input, { types: ['(cities)'] });
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      throw new Error('Location not found');
    }
    else {
      const location = {
        city: place.name,
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng()
      };
      callback(location);
    }
  });
};

export function addToArray(list, location) {
  let arr = list;
  arr.push(location);
  arr = removeDuplicates(arr, 'city');
  if (arr.length === 11) arr.shift();
  return arr;
};

function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
};
