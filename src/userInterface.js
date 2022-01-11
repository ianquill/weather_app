import { geocodeLocation, getWeather } from "./webInterface";

const body = document.body;
const form = document.querySelector('form');
const search = document.querySelector('input');
const weatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast');

initialLoad();

function getGeoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successfulLocation);
    }
}

// callback function runs after location access has been approved by the user / browser
function successfulLocation(pos) {
  let crd = { lat: pos.coords.latitude, lng: pos.coords.longitude };

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.lat}`);
  console.log(`Longitude: ${crd.lng}`);

  update(crd);
}

// refresh fields in UI
async function update(location) {
    const weather = await getWeather(location);
    // updateFields(weather, forecast);
}

function initialLoad() {
    getGeoLocation();
}



function parseSearch() {

}

search.addEventListener('input', async () => {
    const location = await geocodeLocation(search.value);
    update(location);
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
