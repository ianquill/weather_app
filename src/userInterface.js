import WebInterface from "./webInterface";

const body = document.body;
const form = document.querySelector('form');
const search = document.querySelector('input');
const currentWeatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast');

let webby = new WebInterface('84098', 'zip'); // test 
// get browser location on load and try to parse it

async function update() {
    const currentWeather = await webby.getCurrentWeather();
    console.log('currentWeather: ' + currentWeather);
    const forecast = await webby.getForecast(); 
    console.log('forecast: ' + forecast);
    updateFields(currentWeather, forecast);
}

update();


function parseSearch() {
    if (search.value.length == 5) {
        console.log('valid length zip code');
        webby = new WebInterface(search.value.toString(), 'zip') // temp with just zip
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

            currentWeatherContainer.appendChild(newText);
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
