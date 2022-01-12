import { geocodeLocation, getWeather } from "./webInterface";

const body = document.body;
const form = document.querySelector('form');
const search = document.querySelector('input');
const forecastContainer = document.getElementById('forecast');

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
    console.log('got weather');
    updateFields(weather);
}

function initialLoad() {
    getGeoLocation();
}

search.addEventListener('input', async () => {
    const location = await geocodeLocation(search.value);
    update(location);
})

export default async function updateFields(weather) {
    console.log('updatingFields');
    const current = weather[0];
    const daily = weather[1];
    const hourly = weather[2];

    const dateTime = current.date.split(',');

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
    // icon needs to be loaded, etc.


};

