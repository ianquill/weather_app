import { processWeather } from './jsonUtils';

// fetch and return latitude and longitude of entered location 
export async function geocodeLocation(location) {
    console.log("geocoding location: " + location);
    const apiKey = '7519e63fd677e57886d8c3a7dcf17e7c3f57178';
    let data = await fetch(`https://api.geocod.io/v1.7/geocode?q=${location}&api_key=${apiKey}`, { 
        mode: 'cors' 
    });
    data = await data.json();
    const coordinates = data.results[0].location;
    console.log(coordinates);
    return coordinates;
}

export async function getWeather(location){
    // location is an object with keys lat and lon
    const lat = location.lat;
    const lon = location.lng;
    console.log(`getting weather for ${lat}, ${lon}`)

    let weather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=151980c4fdc5d6236c07e9ba3e28e614`, {
        mode: 'cors'
    });
    weather = await weather.json();
    weather = processWeather(weather);
    console.log(weather);
    return weather; 
}
