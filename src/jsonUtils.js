function convertKelvintoF(temp) {
    return (temp * 9/5 -459.67);
}

function unixToDate(date) {
    const ms = date * 1000;
    return new Date(ms).toLocaleString();
}

export function processCurrentWeather(file) {
   console.log(file);

   const object = {
       location: file.name,
       date: unixToDate(file.dt),
       temperature: Math.round(convertKelvintoF(file.main.temp)) + ' F',
       tempMax: Math.round(convertKelvintoF(file.main.temp_max)) + ' F high',
       tempMin: Math.round(convertKelvintoF(file.main.temp_min)) + ' F low',
       pressure: file.main.pressure + ' hPa',
       humidity: file.main.humidity + '% humidity',
       weather: file.weather[0].main
   };

   return object;
    
}

// wraps forecast in object
export function processForecast(file) {
    const forecast = [];

    for (let i = 0; i < file.list.length; i++) {
        const moment = {
            date: unixToDate(file.list[i].dt),
            temperature: Math.round(convertKelvintoF(file.list[i].main.temp)),
            pressure: file.list[i].main.pressure + ' hPa',
            humidity: file.list[i].main.humidity + '% humidity',
            weatherMain: file.list[i].weather[0].main,
            weatherDescription: file.list[i].weather[0].description,
        }
        forecast.push(moment);
    }

    for (let j = 0; j < forecast.length; j++) {
        console.log(forecast[j]);        
    }

    return forecast;
}