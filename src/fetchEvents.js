'use strict';
const axios = require('axios');

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const KEY_API = 'apu3UNEIGJkixbh9YXHiOuAG74i7PIT2';

function fetchEvents(searchQuery){
    const searchQueryTrim = searchQuery.trim();
    return axios.get(`${BASE_URL}events.json?countryCode=${searchQueryTrim}&sort=relevance,desc&apikey=${KEY_API}`)
      .then(response => response.data); 
    // return axios.get(`${BASE_URL}events.json?keyword=${searchQueryTrim}&apikey=${KEY_API}`)
    // .then(response => response.data);     
}  

export default { fetchEvents };