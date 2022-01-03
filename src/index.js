import './style.css';
import WebInterface from './webInterface';
import updateFields from './userInterface';

const body = document.body; 

const webby = new WebInterface();

async function update() {
    const currentWeather = await webby.getCurrentWeather();
    console.log('currentWeather: ' + currentWeather);
    const forecast = await webby.getForecast(); 
    console.log('forecast: ' + forecast);
    updateFields(currentWeather, forecast);
}

update();