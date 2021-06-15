'use strict';
const axios = require('axios');

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const KEY_API = 'apu3UNEIGJkixbh9YXHiOuAG74i7PIT2';

function fetchEvents(searchQuery = ''){ 
    const date = new Date()
    console.log(" date", date.toDateString())
    
    return axios.get(`${BASE_URL}events.json?countryCode=${searchQuery}&sort=date,name,asc&apikey=${KEY_API}`)
      .then(response => {
        console.log(response.data._embedded)
        // console.log(response.data._embedded.forEach(r => console.log(r)))
        return response.data
      }) 
    // return axios.get(`${BASE_URL}events.json?keyword=${searchQuery}&sort=date,name,asc&apikey=${KEY_API}`)
    // .then(response => response.data);     
}  

export default { fetchEvents };


// &startDateTime=${date.toDateString}
//.filter(event =>{
//  event.dates.start.localDate
//  })
// const searchQueryTrim = searchQuery.trim();