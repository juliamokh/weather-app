const URL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const KEY = '?key=ddb43221d2a548889fb0e23b1266b34c';
const DAYS = '&days=7';
const BASE_PATH = `${URL}${KEY}${DAYS}`;

export const get = search => {
  return fetch(`${BASE_PATH}${search}`)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
};
