import './style.css';

const body = document.body; 
const hello = document.createElement('p');
hello.textContent = "Hello webpack!";

body.appendChild(hello);

fetch('http://api.openweathermap.org/data/2.5/weather?zip=97202,us&appid=151980c4fdc5d6236c07e9ba3e28e614', {
    mode: 'cors'
})
.then(function(response) {
    console.log(response.json());
});