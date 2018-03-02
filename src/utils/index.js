export const initAutocomplete = (input, callback) => {
  const autocomplete = new google.maps.places.Autocomplete(input, { types: ['(cities)'] });
  autocomplete.addListener('place_changed', () => callback(autocomplete.getPlace()));
};

export const bindAll = (context, ...names) => {
  names.forEach(name => {
    if (typeof context[name] === 'function') {
      context[name] = context[name].bind(context);
    } else {
      throw Error(
        `Expected function ${name}. Instead received: ${typeof context[name]}`
      );
    }
  });
};

const removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
};

export const addToArray = (list, location) => {
  let arr = list;
  arr.unshift(location);
  arr = removeDuplicates(arr, 'city');
  if (arr.length > 10) arr.pop();
  return arr;
};
