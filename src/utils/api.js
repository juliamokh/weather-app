const START_POINT = 'https://api.weatherbit.io/v2.0/forecast/daily';
const KEY = '?key=ddb43221d2a548889fb0e23b1266b34c';
const DAYS = '&days=7';
const BASE_PATH = `${START_POINT}${KEY}${DAYS}`;

export default function get(path) {
  return fetch(`${BASE_PATH}${path}`)
    .then(response => {
      if (!response.ok) {
        throw alert(`ERROR: ${response.status}`);
      }
      return response.json();
    })
    .catch(err => console.log(err));  
};
