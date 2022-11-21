import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
export function fetchCountries(name) {
  return fetch(
    `${BASE_URL}${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(error =>
      Notiflix.Notify.failure('"Oops, there is no country with that name"')
    );
}
