'use strict';
import './sass/main';
import API from './fetchCountries.js';
import countriesTpl from './templates/countries.hbs';
import countryTpl from './templates/country.hbs';
import { error } from '@pnotify/core';
const debounce = require('lodash.debounce');
const axios = require('axios');

const refs = {
  searchInput: document.querySelector('.searchInput'),
  countryList: document.querySelector('.country-list'),
}

refs.searchInput.addEventListener('input', debounce(onInputSearch, 500));

function onInputSearch(e) {
  resetPage();
  
  const serchQuery = e.target.value;

  if(serchQuery.trim() === '') {
    return ;
  }
  
  API.fetchCounties(serchQuery)
    .then(response => {
    console.log(response)
      return response.data;
    })
    .catch(onFetchError);
}

// function createCountriesMarkup(countries) {
//   if(countries.length === 1){
//     const countryMarkup = countryTpl(countries);
//     refs.countryList.innerHTML = countryMarkup; 
//   }else if(countries.length >= 2 && countries.length <= 10){
//     const countriesMarkup = countriesTpl(countries);
//     refs.countryList.innerHTML = countriesMarkup;
//   }else if(countries.length > 10){
//      error({
//       text: 'Too many matches found. Please enter a more specific query!',
//       mode: 'light',
//       sticker: false,
//       delay: 500,
//     });
//   }else{
//     error({
//       text: `Not found! Try again`,
//       mode: 'dark',
//       sticker: false,
//       width:'280px',
//       delay: 500,
//     });
//   }
// }

function resetPage() {
  refs.countryList.innerHTML = '';
}

function onFetchError (err) {
  console.log(err);
}