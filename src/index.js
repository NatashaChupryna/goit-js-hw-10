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
    console.log(data);

    // if (searchingCountry >= 10) {
    //   Notiflix.Notify.info(
    //     'Too many matches found. Please enter a more specific name.'
    //   );
    // }
    // if (searchingCountry > 2 && searchingCountry < 10) {
    //   listMarkUp(data);
    // }
    if (searchingCountry === 1) {
     return  cardMarkUp(data)
    };
    return;
  });
}

function cardMarkUp(array) {
  const markUp = array
    .map(
      item => `<div class="country_card">
        <img class="flag" src="${item.flags.svg}" alt="" width="60" height="30">
        <h2 class="off_name">${item.altSpellings}</h2>
        <p>Capital : ${item.capital}</p>
        <p>Population : ${item.population}</p>
        <p>Languages : ${Object.values(item.languages)}</p></div>`
    )
    .join('');

  div.innerHTML = markUp;
  console.log(markUp);
}
cardMarkUp([
  {
    flags: {
      png: 'https://flagcdn.com/w320/ua.png',
      svg: 'https://flagcdn.com/ua.svg',
    },
    capital: ['Kyiv'],
    altSpellings: ['UA', 'Ukrayina'],
    languages: {
      ukr: 'Ukrainian',
    },
    population: 44134693,
  },
]);

function listMarkUp(array) {
  const newMarkUp = array
    .map(
      item => `<li>
        <img class="flag" src="${item.flags.svg}" alt="" width="60" height="30">
        <h2 class="off_name">${item.altSpellings}</h2></li>`
    )
    .join('');

  list.innerHTML = newMarkUp;
}
