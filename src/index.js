import './css/styles.css';

import { fetchCountries } from './country-api';
import countryCardTemplate from './templates/country-card.hbs';
import debounce from 'lodash.debounce';
import countryList from './templates/country-all.hbs';

import Notiflix from 'notiflix';

const btnCountryEl = document.querySelector('#search-box');
const countryCardsWrapperEl = document.querySelector('.country-info');
const counryListEl = document.querySelector('.country-list');

const DEBOUNCE_DELAY = 1000;

const onFormSubmit = event => {
  const city = btnCountryEl.value;


  function clear () {
    countryCardsWrapperEl.innerHTML = '';
    counryListEl.innerHTML = '';
  }

  fetchCountries(city)
    .then(data => {
      if (data.length === 1) {
        clear ()
        data[0].languages = data[0].languages.map(el => el.name).join(', ');
        countryCardsWrapperEl.innerHTML = countryCardTemplate(data[0]);
      } else if (data.length >= 2 && data.length <= 10) {
        clear ()
        counryListEl.innerHTML = countryList(data);
      } else if (data.length > 10) {
        Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
      }
    })
    .catch(err => {
      Notiflix.Notify.failure('Oops, there is no country with that nam');
    });
};

btnCountryEl.addEventListener('input', debounce(onFormSubmit, DEBOUNCE_DELAY));
