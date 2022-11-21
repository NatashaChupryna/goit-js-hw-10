import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
var debounce = require('lodash.debounce');
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const div = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  event.preventDefault();
  const searchingCountry = input.value.trim();

  if (!searchingCountry) {
    Notiflix.Notify.info('Please, enter country name');
    return;
  }

  fetchCountries(searchingCountry).then(data => {
    div.innerHTML = '';
    list.innerHTML = '';
    
    if (searchingCountry.length > 10) {
     return Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (searchingCountry.length > 2 && searchingCountry.length < 10) {
      div.innerHTML = cardMarkUp(data);
      // list.innerHTML = listMarkUp(data);
    } else  {
      list.innerHTML = listMarkUp(data);
      // div.innerHTML = cardMarkUp(data);
    };
  });
}

function cardMarkUp(array) {
  return array
    .map(
      item => `<div class="country_card">
        <img class="flag" src="${item.flags.svg}" alt="" width="60" height="30">
        <h2 class="off_name">${item.name.official}</h2>
        <p>Capital : ${item.capital}</p>
        <p>Population : ${item.population}</p>
        <p>Languages : ${Object.values(item.languages)}</p></div>`
      )
    .join('')
};


function listMarkUp(array) {
  return array.map(
      item => `<li>
        <img class="flag" src="${item.flags.svg}" alt="" width="60" height="30">
        <h2 class="off_name">${item.name.official}</h2></li>`
    )
    .join('');
}
