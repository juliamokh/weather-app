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

export const insert = (host, children) => {
  const node = host;
  if (typeof children === 'string') {
    node.insertAdjacentHTML('beforeend', children)
  } else if (Array.isArray(children)) {
      children.forEach(elem => {
        (typeof elem === 'string') ? node.insertAdjacentHTML('beforeend', elem) : node.append(elem);
      });
  } else {
    node.append(elem);
  };
  return node;
}

const removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
};

export const addToArray = (list, location) => {
  let arr = list;
  arr.push(location);
  arr = removeDuplicates(arr, 'city');
  if (arr.length === 11) arr.shift();
  return arr;
};
