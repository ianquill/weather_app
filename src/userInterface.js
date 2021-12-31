const body = document.body;
const form = document.querySelector('form');
const search = document.querySelector('input');
const currentWeatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast');

function parseSearch() {
    if (search.value.length == 5) {
        console.log('valid length zip code');
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
