import './style.css';
import WebInterface from './webInterface';
import updateFields from './userInterface';

const body = document.body; 
const hello = document.createElement('p');
hello.textContent = "Hello webpack!";

body.appendChild(hello);

const webby = new WebInterface();

function updateText() {
    console.log('promise returned!');
}

async function update() {
    const currentWeather = await webby.getCurrentWeather();
    console.log('currentWeather: ' + currentWeather);
    updateFields(currentWeather);
    const forecast = await webby.getForecast(); 
    console.log('forecast: ' + forecast);
    updateFields(forecast);
}

update();