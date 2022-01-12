import { processWeather } from './jsonUtils';

const geocodioAPIKey = '7519e63fd677e57886d8c3a7dcf17e7c3f57178';
// fetch and return latitude and longitude of entered location 
export async function geocodeLocation(location) {
    console.log("geocoding location: " + location);
    let data = await fetch(`https://api.geocod.io/v1.7/geocode?q=${location}&api_key=${geocodioAPIKey}`, { 
        mode: 'cors' 
    });
    data = await data.json();
    const coordinates = data.results[0].location;
    console.log(coordinates);
    return coordinates;
}

export async function reverseGeocode(location) {
    console.log("reverse geocoding location");
    console.log(location);
    const locationString = (location.lat + ',' + location.lng);
    let data = await fetch(`https://api.geocod.io/v1.7/reverse?q=${locationString}&api_key=${geocodioAPIKey}`, {
        mode: 'cors'
    });
    data = await data.json();
    return data;
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
