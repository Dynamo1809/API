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

const refs = {
  searchInput: document.querySelector('.hero-form-field'),
  eventList: document.querySelector('.event-card-set'),
  select: document.querySelector('.select'),
  form: document.querySelector('hero-form')
}
// console.log(refs.select)
refs.searchInput.addEventListener('input', debounce(onInputSearch, 500));
refs.select.addEventListener('change', onCountryChange);

async function hello() {
  const ok = await axios.get(`${BASE_DISCOVERY_URL}events.json?countryCode=US
  &sort=date,name,asc&size=150&apikey=${DISCOVERY_KEY}`)
    .then(response => { 
      // const currentTime = Date.now();
      // console.log( response.data._embedded.events.filter(event => (currentTime - 345600000) <= new Date(event.dates.start.localDate).getTime()))
      console.log( response.data._embedded.events)
      // console.log('hello ~ currentTime', currentTime)    
      // console.log(new Date("2021-06-19").getTime())
      
      // .map(event => event.dates.start.localDate))
      return response.data._embedded
    }) 
    return ok ;
}

hello()


markupHomePage();


async function fetchUserCountryCodeByIp() {
      const userCountryCode = await axios.get('https://ipapi.co/country/').then(response => response.data);         
        return userCountryCode;
  }


function onCountryChange(e) {
  console.log(e.currentTarget.value)

  fetchEvents(e.currentTarget.value).then(r => appendEventsMarkup(r.events))
}

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
        
        // console.log( response.data._embedded)
        return response.data._embedded
      }) 
      return data;
  // .forEach(r => console.log(r))
  // Object.values()
}  

async function markupHomePage() {
  const randomCountryCode = getRandomCountryCode();
  const currentTime = Date.now();
  try{
    const countryCode = await fetchUserCountryCodeByIp();
    // console.log('kod v markuppe', countryCode)
    fetchEvents(countryCode).then(r => {
      if(!r) {
        refs.select.value = randomCountryCode;
        fetchEvents(randomCountryCode)
          // .then(r => appendEventsMarkup(r.events))
          .then(r => {
            console.log('markup', r.events)
            while(r.events.filter(event => (currentTime - 345600000) <= new Date(event.dates.start.localDate).getTime())) {

            }
            appendEventsMarkup(r.events.filter(event => (currentTime - 345600000) <= new Date(event.dates.start.localDate).getTime()))  
          })
      } else{
        appendEventsMarkup(r.events)
        refs.select.value = countryCode;
      }
    })
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

function getRandomCountryCode() {
  const allCountryCodes = countries.map(country => country.countryCode);
  const countriesLengt = allCountryCodes.length;
  const randomNumber = Math.floor(Math.random() * (countriesLengt - 0) + 0);

  return allCountryCodes[randomNumber];
}

function appendEventsMarkup(event) {
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


// function fetchEventById() {
//   const id = `https://app.ticketmaster.com/discovery/v2/events/LvZ18pyOjKEPAV8ZU8yym.json?apikey=${DISCOVERY_KEY}`;
//   return fetch(id)
//       .then(r => r.json())
//       .then(data => {
//           console.log('fetch', data)
//           // console.log(data._embedded.events)
//           return data
//       })
//       .catch(() => {
//           errorFromServerById();
//       });
// }
// fetchEventById()