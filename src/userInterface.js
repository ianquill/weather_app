const body = document.body;
const form = document.querySelector('form');
const currentWeatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast');

export default function updateFields(weather, forecast) {
    for (const key in weather) {
        if (Object.hasOwnProperty.call(weather, key)) {
            const newText = document.createElement('p');
            newText.textContent = weather[key];

            currentWeatherContainer.appendChild(newText);
        }
    }
    forecast.forEach(element => {
        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                const newText = document.createElement('p');
                newText.textContent = element[key];

                forecastContainer.appendChild(newText);
            }
        }
    });
};
