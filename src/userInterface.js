import { reverseGeocode, geocodeLocation, getWeather } from "./webInterface";

const body = document.body;
const form = document.querySelector('form');
const search = document.querySelector('input');

// *** SETUP CURRENT WEATHER ***
const currentWeatherContainer = document.getElementById('current-weather');
// temporarily disable currentWeatherContainer (maybe start w/ it like this)
// currentWeatherContainer.style.visibility = 'hidden';
const currentLocation = document.getElementById('current-location');
const currentTime = document.getElementById('current-time');
const currentDate = document.getElementById('current-date');
const currentTemp = document.getElementById('current-temperature');
const currentHigh = document.getElementById('current-high');
const currentLow = document.getElementById('current-low');
const currentPressure = document.getElementById('current-pressure');
const currentConditions = document.getElementById('current-conditions');
const currentIcon = document.getElementById('current-icon');
currentLocation.textContent = "ass balls";
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

export default async function updateFields(weather, locationName) {
    console.log('updatingFields');
    const current = weather[0];
    const daily = weather[1];
    const hourly = weather[2];

    // current
    const dateTime = current.date.split(',');
    console.log(locationName);
    currentLocation.textContent = (
        locationName.results[0].address_components.city + ', ' +
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
    }
    currentIcon.src = `http://openweathermap.org/img/wn/${current.icon}@4x.png`;

    // hourly
    for (let j = 0; j< hourly.length; j++) {
        const icon = new Image();
        icon.classList.add('hour-icon');
        icon.src = `http://openweathermap.org/img/wn/${hourly[j].icon}.png`;
        const container = document.createElement('div');
        container.classList.add('hour-container');
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
        container.classList.add('day-container');
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

        date.textContent = daily[i].date.split(', ')[0];
        temp.textContent = daily[i].temperature;
        conditions.textContent = daily[i].weather;

        textContainer.append(date, temp, conditions);
        container.append(icon, textContainer);
        dailyWeatherContainer.appendChild(container);
    }
};

