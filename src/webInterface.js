fetch('api.openweathermap.org/data/2.5/zip?=97202&appid=151980c4fdc5d6236c07e9ba3e28e614', {
    mode: 'cors'
})
.then(function(response) {
    console.log(response.json());
});