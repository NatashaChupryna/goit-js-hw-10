import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
var debounce = require('lodash.debounce');
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const div = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSearch, 300));

function onSearch(event) {
    event.preventDefault();
    const searchingCountry = input.value.trim();

    if (!searchingCountry) {
        Notiflix.Notify.info('Please, enter country name');
        return
    };
    fetchCountries(searchingCountry).then(data => markUp(data));
}

function markUp(array) {
    const newMarkUp = array
      .map(
        item => `<li>
        <img class="flag" src="${item.flags.svg}" alt="" width="60" height="30">
        <h2 class="off_name">${item.altSpellings}</h2>
        <p>Capital : ${item.capital}</p>
        <p>Population : ${item.population}</p>
        <p>Languages : ${Object.values(item.languages)}</p>
      </li>`
      )
      .join('');
    
    list.innerHTML = newMarkUp;
    console.log(newMarkUp)
}
