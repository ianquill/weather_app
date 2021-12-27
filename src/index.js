import './style.css';
import WebInterface from './webInterface';

const body = document.body; 
const hello = document.createElement('p');
hello.textContent = "Hello webpack!";

body.appendChild(hello);

const webby = new WebInterface();

function updateText() {
    console.log('promise returned!');
}

async function update() {
    await webby.getCurrentWeather();
    updateText();
    await webby.getForecast(); 
    updateText();
}

update();