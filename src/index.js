import './style.css';

const body = document.body; 
const hello = document.createElement('p');
hello.textContent = "Hello webpack!";

body.appendChild(hello);