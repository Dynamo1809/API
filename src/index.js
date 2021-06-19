'use strict';
import './sass/main';
import eventsTpl from './templates/events.hbs';
import countries from './json/countries.json';
import selectOptionsTpl from './templates/selectOptions';
// import { error } from '@pnotify/core';
const debounce = require('lodash.debounce');
const axios = require('axios');

const BASE_DISCOVERY_URL = 'https://app.ticketmaster.com/discovery/v2/';
const DISCOVERY_KEY = 'apu3UNEIGJkixbh9YXHiOuAG74i7PIT2';

const IPSTACK_KEY = '07cf455019ad129b53694afd3f2a3f3d';
const BASE_IPSTACK_URL = 'http://api.ipstack.com/';

const refs = {
  searchInput: document.querySelector('.hero-form-field'),
  eventList: document.querySelector('.event-card-set'),
  select: document.querySelector('.select')
}
// console.log(refs.select)
refs.searchInput.addEventListener('input', debounce(onInputSearch, 500));

markupHomePage()

async function fetchEvents(countryCode = ''){ 
  let sizePage;
  let page = 0;
    if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
    sizePage = 21;
    } else{
    sizePage = 20;
    };
    const data = await axios.get(`${BASE_DISCOVERY_URL}events.json?countryCode=${countryCode}
    &sort=date,name,asc&size=${sizePage}&page=${page}&apikey=${DISCOVERY_KEY}`)
      .then(response => {
        page += 1;
        // const embeddeds = response.data._embedded
        // console.log(Array.from((response.data._embedded), (v,k) => k))
        return response.data._embedded
      }) 
      // console.log('data', data._embedded )
      return data;
  // .forEach(r => console.log(r))
  // Object.values()
}  

// console.log(Array.from({events:[1,2,3,4,5,6,7,8,9,]}, (v,k) => k))

async function fetchUserCountryCodeByIp() {
    const userCountryCode = await axios.get(`${BASE_IPSTACK_URL}check?access_key=${IPSTACK_KEY}`)
      .then(response => response.data.country_code);
    return userCountryCode;
}
      // const data = await fetchEvents(countryCode)
async function markupHomePage() {
  try{
    const countryCode = await fetchUserCountryCodeByIp();
    console.log('markupHomePage ~ countryCode', countryCode)
    fetchEvents(countryCode).then(r => {
      if(!r) {
        fetchEvents('').then(r => createEventMarkup(r.events))
      }else{
        createEventMarkup(r.events)
        refs.select.value = countryCode;
      }
    }) 
    //   refs.select.value = '';
    //   fetchEvents('').then(createEventMarkup )
    // }else{
    //   refs.select.value = countryCode;
    //   fetchEvents(countryCode).then(r => createEventMarkup(r.events))
    // }
    // .catch(err =>console.log(err))
    // .then(countryCode => {
    //    refs.select.value = countryCode;
    //    fetchEvents(countryCode).then( r => createEventMarkup(r))
    //    return fetchEvents(countryCode)
    // })
    // .then(response => {
    //   if(!response){
    //     console.log(response)
    //     refs.select.value = '';
    //     return fetchEvents()
    //             .then(response => {
    //               return createEventMarkup(response._embedded)
    //             })
    //   }
    // })
    }catch (error){
      console.log(error)
    }
}

// refs.select.value = countryCode;
        // console.log(response._embedded.events)
        // createEventMarkup(response._embedded)
        // console.log(response._embedded.events.map(event => event))
        // const eventDate = response._embedded.events[1].dates.start.localDate;
        // const currentTime = Date.now();
        // const filterByCurrentDate = await response._embedded.events.filter(event => currentTime < new.Date(event.dates.start.localDate) )
                  // console.log('markupHomePage ~ filterByCurrentDate', filterByCurrentDate)
        // console.log('selectRef', refs.select.value)     
      // } else{
      //   refs.select.value = '';
      //   // console.log('~ refs.select.value', refs.select.value)   
      //  return fetchEvents()
      //           .then(response => {
      //             // console.log(response)
      //             console.log(response._embedded)
      //             // console.log(response._embedded.events[1].dates.start.localDate)
      //             // const eventDate = response._embedded.events[1].dates.start.localDate;
      //             // console.log('events',response._embedded.events)
      //             // console.log('markupHomePage ~ eventDate', eventDate)                 
      //             // const currentTime = Date.now();
      //             // const filterByCurrentDate = response._embedded.events.filter(event => currentTime < new.Date(event.dates.start.localDate) )
      //             // console.log('markupHomePage ~ filterByCurrentDate', filterByCurrentDate)
      //           //  const testDate = new Date(eventDate)
      //           //  console.log(testDate.getTime())
      //           //   const date = Date.now(eventDate)                                
      //             // const deltaTime = currentTime - testDate.getTime() ;
      //             // console.log('markupHomePage ~ deltaTime', deltaTime)               
      //             // console.log('markupHomePage ~ date', date)               
      //             return createEventMarkup(response._embedded)
      //           })

function onInputSearch(e) {
  resetPage();
  
  const serchQuery = e.target.value;

  if(serchQuery.trim() === '') {
    return ;
  }
  
  fetchEvents(serchQuery.trim())
    .then(response => {
      // console.log(response._embedded)
      createEventMarkup(response._embedded)
      return response._embedded;
    })
    .catch(onFetchError);
}

function createSelectorOptionsMarkup(options) {
  return selectOptionsTpl(options);
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

const optionsMarkup = createSelectorOptionsMarkup(countries);
refs.select.insertAdjacentHTML('beforeend',optionsMarkup);

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


  // let sizePage =20;

// const onResize = function(e) {
//   const width = e.target.outerWidth;
//   console.log("onResize ~ width", width)
//   // height = e.target.outerHeight;
//   if( width >= 768 && width < 1280) {
//     sizePage = 21;
//   }else{
//     sizePage = 20;
//   }
//   fetchEvents()
//    console.log('in onResize',sizePage)
  
// }
// window.addEventListener("resize", debounce(onResize, 250));

// function fetchEvents(countryCode = ''){ 
//   //-- Тестовая штука --//
//   let sizePage;
//   if(document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
//     sizePage = 21;
//   }else{
//     sizePage = 20;
//   }
//   // window.addEventListener("resize", onResize);
//   // document.documentElement.clientWidth
//   // console.log(document.documentElement.clientWidth)
//     // const date = new Date()
//     // console.log(" date", date.toDateString())
//     console.log('sizePage in fetch', sizePage)
//     return axios.get(`${BASE_DISCOVERY_URL}events.json?countryCode=${countryCode}&sort=date,name,asc&size=${sizePage}&apikey=${DISCOVERY_KEY}`)
//       .then(response => {
//         console.log(response.data._embedded)
//         // console.log(response.data._embedded.forEach(r => console.log(r)))
//         return response.data
//       }) 
//     // return axios.get(`${BASE_DISCOVERY_URL}events.json?keyword=${searchQuery}&sort=date,name,asc&apikey=${DISCOVERY_KEY}`)
//     // .then(response => response.data);     
// }  
