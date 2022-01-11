import { geocodeLocation, getWeather } from "./webInterface";

const body = document.body;
const form = document.querySelector('form');
const search = document.querySelector('input');
const weatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast');
let location;
let locationRetrieved;

initialLoad();

function getGeoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successfulLocation);
    } else {
        console.log('else triggered');
    }
}

function successfulLocation(pos) {
  let crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  update(crd);
}

// refresh fields in UI
async function update(location) {
    const weather = await getWeather(location);
    console.log('weather: ' + weather);
    // updateFields(weather, forecast);
}

function initialLoad() {
    getGeoLocation();
}



function parseSearch() {
    if (search.value.length == 5) {
        console.log('valid length zip code');
        webInterface = new WebInterface(search.value.toString(), 'zip') // temp with just zip
        update();
    } else {
        console.log('invalid input. try a zip code');
    }
}

search.addEventListener('input', () => {
    parseSearch();
})

export default function updateFields(weather, forecast) {
    // update current weather elements
    for (const key in weather) {
        if (Object.hasOwnProperty.call(weather, key)) {
            const newText = document.createElement('p');
            newText.textContent = weather[key];
            // newText.class = key.toString();
            newText.class = "test";

            weatherContainer.appendChild(newText);
        }
    }

    // update forecast (currently displays all data points)
    forecast.forEach(element => {
        const forecastCard = document.createElement('div');
        forecastCard.id = 'forecast-card';
        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                const newText = document.createElement('p');
                newText.textContent = element[key];

                forecastCard.appendChild(newText);
            }
        }
        forecastContainer.appendChild(forecastCard);
    });
};
