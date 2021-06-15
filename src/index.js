'use strict';
import './sass/main';
import API from './fetchEvents.js';
import eventsTpl from './templates/events.hbs';
import countryTpl from './templates/country.hbs';
import { error } from '@pnotify/core';
const debounce = require('lodash.debounce');
const axios = require('axios');

const IPSTACK_KEY = '07cf455019ad129b53694afd3f2a3f3d';
const BASE_IPSTACK_URL = 'http://api.ipstack.com/';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const KEY_API = 'apu3UNEIGJkixbh9YXHiOuAG74i7PIT2';

markupHomePage()

async function fetchUserCountryCodeByIp() {
  try{
    const userCountryCode = await axios.get(`${BASE_IPSTACK_URL}check?access_key=${IPSTACK_KEY}`)
      .then(response => {
        return response.data.country_code;
      });
      // console.log(userCountryCode);
    return userCountryCode;
  }catch (error){
    onFetchError(error);
  }
}

function markupHomePage() {
  fetchUserCountryCodeByIp()
  .then(countryCode =>{
    // console.log(countryCode);
    return API.fetchEvents(countryCode)
  .then(response => {
    if(response._embedded){
      createEventMarkup(response._embedded)
    } else{
     return fetchSortEventsByDate()
              .then(createEventMarkup)
    }
  })
  .catch(onFetchError);
  } )
}

function fetchSortEventsByDate () {
    return axios.get(`${BASE_URL}events.json?sort=relevance,desc&apikey=${KEY_API}`)
      .then(response => response.data._embedded); 
}

// console.log("fetchUserCountryCodeByIp", fetchUserCountryCodeByIp())

  

const refs = {
  searchInput: document.querySelector('.searchInput'),
  eventList: document.querySelector('.event-list'),
}

refs.searchInput.addEventListener('input', debounce(onInputSearch, 500));

function onInputSearch(e) {
  resetPage();
  
  const serchQuery = e.target.value;

  if(serchQuery.trim() === '') {
    return ;
  }
  
  API.fetchEvents(serchQuery)
    .then(response => {
      console.log(response._embedded)
      createEventMarkup(response._embedded)
      return response._embedded;
    })
    .catch(onFetchError);
}

function createEventMarkup(event) {
  const eventMarkup = eventsTpl(event);
  refs.eventList.innerHTML = eventMarkup;
}

function resetPage() {
  refs.eventList.innerHTML = '';
}

function onFetchError (err) {
  console.log(err);
}


  // if(events.length === 1){
  //   const eventMarkup = eventsTpl(events);
  //   refs.eventList.innerHTML = countryMarkup; 
  // }else if(countries.length >= 2 && countries.length <= 10){
  //   const countriesMarkup = eventsTpl(countries);
  //   refs.countryList.innerHTML = countriesMarkup;
  // }else if(events.length > 10){
  //    error({
  //     text: 'Too many matches found. Please enter a more specific query!',
  //     mode: 'light',
  //     sticker: false,
  //     delay: 500,
  //   });
  // }else{
  //   error({
  //     text: `Not found! Try again`,
  //     mode: 'dark',
  //     sticker: false,
  //     width:'280px',
  //     delay: 500,
  //   });
  // }