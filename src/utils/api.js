let query = (city) => {
  const baseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
  const key = '?key=ddb43221d2a548889fb0e23b1266b34c';
  const days = '&days=7';
  const endpoint = '&city=';
  return baseUrl + key + days + endpoint + city;
};

let getForecast = (city) => {
  fetch(query(city))
    .then(response => handleErrors(response))
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(err => console.log(err));       
};

let handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};
