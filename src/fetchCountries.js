'use strict';
const axios = require('axios');

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

function fetchCounties(searchQuery){
    const searchQueryTrim = searchQuery.trim();
    return axios.get(`${BASE_URL}name/${searchQueryTrim}`);      
}  

export default { fetchCounties };