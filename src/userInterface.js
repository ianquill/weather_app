const body = document.body;
const form = document.querySelector('form');
const currentWeatherContainer = document.getElementById('current-weather');

export default function updateFields(weather) {
    for (const key in weather) {
        if (Object.hasOwnProperty.call(weather, key)) {
            const newText = document.createElement('p');
            newText.textContent = weather[key];

            currentWeatherContainer.appendChild(newText);
        }
    }
};
