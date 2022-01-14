import { reverseGeocode, geocodeLocation, getWeather } from "./webInterface";

const main = document.getElementById('main');
const mainLeft = document.getElementById('main-left');
const mainRight = document.getElementById('main-right');
const form = document.querySelector('form');
const search = document.querySelector('input');

// *** SETUP CURRENT WEATHER ***
const currentWeatherContainer = document.getElementById('current-weather');
currentWeatherContainer.classList.add('card');
currentWeatherContainer.style.visibility = 'hidden';

// *** SETUP DAILY ***
const dailyWeatherContainer = document.getElementById('daily');

// setup hourly
const hourlyWeatherContainer = document.getElementById('hourly');

initialLoad();

function getGeoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successfulLocation);
    }
}

// callback function runs after location access has been approved by the user / browser
function successfulLocation(pos) {
  const crd = { lat: pos.coords.latitude, lng: pos.coords.longitude };

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.lat}`);
  console.log(`Longitude: ${crd.lng}`);

  update(crd);
}

// refresh fields in UI
async function update(location) {
    const weather = await getWeather(location);
    const locationName = await reverseGeocode(location);
    console.log('got weather');
    updateFields(weather, locationName);
}

function initialLoad() {
    getGeoLocation();
}

search.addEventListener('keydown', async (e) => {
    if (e.code === "Enter") {
        const location = await geocodeLocation(search.value);
        update(location);
    }
})

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export default async function updateFields(weather, locationName) {
    removeAllChildNodes(currentWeatherContainer);
    removeAllChildNodes(hourlyWeatherContainer);
    removeAllChildNodes(dailyWeatherContainer);

    console.log('updatingFields');
    const current = weather[0];
    const daily = weather[1];
    const hourly = weather[2];

    // current

    // *** CHANGE THESE IN CSS TO CLASSES 
    const currentTextContainer = document.createElement('div');
    currentTextContainer.classList.add('current-text');
    const currentLocation = document.createElement('h2');
    currentLocation.classList.add('current-location');
    const currentTime = document.createElement('h3');
    currentTime.classList.add('current-time');
    const currentDate = document.createElement('h4');
    currentDate.classList.add('current-date', 'current-small');
    const currentTempsContainer = document.createElement('div');
    currentTempsContainer.classList.add('current-temps');
    const currentTemp = document.createElement('h1');
    currentTemp.classList.add('current-temperature');
    const currentHighLow = document.createElement('div');
    currentHighLow.classList.add('current-highlow');  
    const currentHigh = document.createElement('div');
    currentHigh.classList.add('current-high');
    const currentLow = document.createElement('div');
    currentLow.classList.add('current-low');
    const currentPressure = document.createElement('div');
    currentPressure.classList.add('current-pressure');
    const currentConditions = document.createElement('div');
    currentConditions.classList.add('current-conditions');
    const currentIcon = document.createElement('img');
    currentIcon.classList.add('current-icon');
    currentIcon.src = `http://openweathermap.org/img/wn/${current.icon}@4x.png`;
    const currentRight = document.createElement('div');
    currentRight.classList.add('current-right');
    const sectionLabel = document.createElement('h3');
    sectionLabel.classList.add('section-label');
    sectionLabel.textContent = "Current Conditions:";


    const dateTime = current.date.split(',');


    console.log(locationName);
    currentLocation.textContent = (
        locationName.results[0].address_components.city + ', ' +
        locationName.results[0].address_components.state + ' ' +
        locationName.results[0].address_components.country);
    currentTime.textContent = dateTime[0];
    currentDate.textContent = dateTime[1];
    currentTemp.textContent = current.temperature;
    currentHigh.textContent = daily[0].tempMax;
    currentLow.textContent = daily[0].tempMin;
    currentPressure.textContent = current.pressure;
    currentConditions.textContent = current.weather;
    console.log(currentIcon);
    currentIcon.onload = () => {
        console.log('image successfully loaded');
        currentWeatherContainer.style.visibility = 'visible';

        currentHighLow.append(currentHigh, currentLow);
        currentTempsContainer.append(currentTemp, currentHighLow);
        currentTextContainer.append(currentLocation, currentTime, currentDate, currentTempsContainer, currentPressure, currentConditions);
        currentRight.append(sectionLabel, currentIcon);
        currentWeatherContainer.append(currentTextContainer, currentRight);
        

    }



    // hourly
    for (let j = 0; j< hourly.length; j++) {
        const icon = new Image();
        icon.classList.add('hour-icon');
        icon.src = `http://openweathermap.org/img/wn/${hourly[j].icon}.png`;
        const container = document.createElement('div');
        container.classList.add('hour-container', 'card');
        const time = document.createElement('h3');
        time.classList.add('hour-time');
        const temp = document.createElement('h3');
        temp.classList.add('hour-small');
        const humidity = document.createElement('h3'); 
        humidity.classList.add('hour-humidity');
        const conditions = document.createElement('h3'); 
        conditions.classList.add('hour-conditions');

        let timeString = hourly[j].time.split(',');
        timeString = timeString[1];
        timeString = timeString.split(':');
        timeString = `${timeString[0]}:${timeString[1]} ${timeString[2].split(' ')[1]}`;
        time.textContent = timeString;

        temp.textContent = hourly[j].temperature;
        humidity.textContent = hourly[j].humidity;
        conditions.textContent = hourly[j].weather;

        container.append(time, temp, humidity, conditions, icon);
        hourlyWeatherContainer.appendChild(container);
    }

    // daily
    for (let i = 0; i < daily.length; i++) {
        // setup daily template
        const container = document.createElement('div');
        container.classList.add('day-container', 'card');
        const icon = new Image();
        icon.src = `http://openweathermap.org/img/wn/${daily[i].icon}@4x.png`;
        icon.classList.add('day-icon');

        const textContainer = document.createElement('div');
        textContainer.classList.add('day-text');
        const date = document.createElement('h4');
        date.classList.add('day-date', 'day-small');
        const temp = document.createElement('h1');
        temp.classList.add('day-temperature');
        const conditions = document.createElement('h4');
        conditions.classList.add('day-description');
        const tempHigh = document.createElement('h4');
        tempHigh.classList.add('day-high', 'day-small');
        const tempLow = document.createElement('h4');
        tempLow.classList.add('day-low', 'day-small');
        const highLowContainer = document.createElement('div');
        highLowContainer.classList.add('day-highlow');

        date.textContent = daily[i].date.split(', ')[0];
        temp.textContent = daily[i].temperature;
        tempHigh.textContent = daily[i].tempMax;
        tempLow.textContent = daily[i].tempMin;
        conditions.textContent = daily[i].weather;

        highLowContainer.append(tempHigh, tempLow);
        textContainer.append(date, temp, conditions);
        container.append(icon, textContainer, highLowContainer);
        dailyWeatherContainer.appendChild(container);
    }
};

