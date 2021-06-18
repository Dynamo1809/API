'use strict';
// const axios = require('axios');
// const debounce = require('lodash.debounce');

// const BASE_DISCOVERY_URL = 'https://app.ticketmaster.com/discovery/v2/';
// const DISCOVERY_KEY = 'apu3UNEIGJkixbh9YXHiOuAG74i7PIT2';

// let sizePage;

const onResize = function(e) {
  //note i need to pass the event as an argument to the function
  const width = e.target.outerWidth;
  console.log("🚀 ~ file: fetchEvents.js ~ line 13 ~ onResize ~ width", width)
  let sizePage;
  // height = e.target.outerHeight;
  if( width >= 768 && width < 1280) {
    sizePage = 21;
  }else{
    sizePage = 20;
  }
 console.log('in onResize',sizePage)
}
// window.addEventListener("resize", debounce(onResize, 250));



function fetchEvents(countryCode = ''){ 
  window.addEventListener("resize", debounce(onResize, 250));
  // let sizePage;
  // if(document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
  //   sizePage = 21;
  // }else{
  //   sizePage = 20;
  // }
  // window.addEventListener("resize", onResize);
  // document.documentElement.clientWidth
  // console.log(document.documentElement.clientWidth)
  // document.documentElement.clientHeight
  // console.log(document.documentElement.clientHeight)
    // const date = new Date()
    // console.log(" date", date.toDateString())
    console.log('sizePage in fetch', sizePage)
    return axios.get(`${BASE_DISCOVERY_URL}events.json?countryCode=${countryCode}&sort=date,name,asc&size=${sizePage}&apikey=${DISCOVERY_KEY}`)
      .then(response => {
        console.log(response.data._embedded)
        // console.log(response.data._embedded.forEach(r => console.log(r)))
        return response.data
      }) 
    // return axios.get(`${BASE_DISCOVERY_URL}events.json?keyword=${searchQuery}&sort=date,name,asc&apikey=${DISCOVERY_KEY}`)
    // .then(response => response.data);     
}  

export default { fetchEvents };




// &startDateTime=${date.toDateString}
//.filter(event =>{
//  event.dates.start.localDate
//  })
// const searchQueryTrim = searchQuery.trim();