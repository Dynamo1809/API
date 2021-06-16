'use strict';
const axios = require('axios');

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const KEY_API = 'apu3UNEIGJkixbh9YXHiOuAG74i7PIT2';

function fetchEvents(countryCode = ''){ 
  let sizePage;
  if(document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
    sizePage = 21;
  }else{
    sizePage = 20;
  }

  document.documentElement.clientWidth
  console.log(document.documentElement.clientWidth)
  // document.documentElement.clientHeight
  // console.log(document.documentElement.clientHeight)
    // const date = new Date()
    // console.log(" date", date.toDateString())
    
    return axios.get(`${BASE_URL}events.json?countryCode=${countryCode}&sort=date,name,asc&size=${sizePage}&apikey=${KEY_API}`)
      .then(response => {
        console.log(response.data._embedded)
        // console.log(response.data._embedded.forEach(r => console.log(r)))
        return response.data
      }) 
    // return axios.get(`${BASE_URL}events.json?keyword=${searchQuery}&sort=date,name,asc&apikey=${KEY_API}`)
    // .then(response => response.data);     
}  
  console.log("🚀 ~ file: fetchEvents.js ~ line 24 ~ fetchEvents ~ document.documentElement.clientWidth", document.documentElement.clientWidth)
  console.log("🚀 ~ file: fetchEvents.js ~ line 24 ~ fetchEvents ~ document.documentElement.clientWidth", document.documentElement.clientWidth)
  console.log("🚀 ~ file: fetchEvents.js ~ line 24 ~ fetchEvents ~ document.documentElement.clientWidth", document.documentElement.clientWidth)

export default { fetchEvents };












// &startDateTime=${date.toDateString}
//.filter(event =>{
  console.log("🚀 ~ file: fetchEvents.js ~ line 43 ~ document.documentElement.clientWidth", document.documentElement.clientWidth)
  console.log("🚀 ~ file: fetchEvents.js ~ line 43 ~ document.documentElement.clientWidth", document.documentElement.clientWidth)
  console.log("🚀 ~ file: fetchEvents.js ~ line 43 ~ document.documentElement.clientWidth", document.documentElement.clientWidth)
  console.log("🚀 ~ file: fetchEvents.js ~ line 43 ~ document.documentElement.clientWidth", document.documentElement.clientWidth)
//  event.dates.start.localDate
//  })
// const searchQueryTrim = searchQuery.trim();