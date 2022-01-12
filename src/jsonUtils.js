function convertKelvintoF(temp) {
    return (temp * 9/5 - 459.67);
}

function unixToDate(date) {
    const ms = date * 1000;
    return new Date(ms).toLocaleString();
}

export function processWeather(file) {
   console.log(file);
   const current = file.current;

   // store retrieved data into object, getting rid of anything unneeded
   const currentWeather = {
       // send this as another argument from geocodio?
       // location: file.name,
       alerts: file.alerts.event,  
       date: unixToDate(current.dt),
       sunrise: unixToDate(current.sunrise),
       sunset: unixToDate(current.sunset),
       temperature: Math.round(convertKelvintoF(current.temp)) + ' F',
       feelsLike: Math.round(convertKelvintoF(current.feels_like)) + ' F',

    //    tempMax: Math.round(convertKelvintoF(file.main.temp_max)) + ' F high',
    //    tempMin: Math.round(convertKelvintoF(file.main.temp_min)) + ' F low',
       pressure: current.pressure + ' hPa',
       humidity: current.humidity + '% humidity',
       weather: current.weather[0].main,
       icon: current.weather[0].icon
   };

   const daily = file.daily;
   const dailyWeather = [];

   // need to come back and add formatting here or in UI and move that^^ stuff
   for (let i = 0; i < daily.length; i++) {
       const dayForecast = {
           date: unixToDate(daily[i].dt),
           temperature: Math.round(convertKelvintoF(daily[i].temp.day)),
           tempMax: Math.round(convertKelvintoF(daily[i].temp.max)),
           tempMin: Math.round(convertKelvintoF(daily[i].temp.min)),
           pressure: daily[i].pressure,
           weather: daily[i].weather.main,
           icon: daily[i].weather.icon
       }
       dailyWeather.push(dayForecast);
   };

   const hourly = file.hourly;
   const hourlyWeather = [];

   for (let i = 0; i < hourly.length; i++) {
        const hourForecast = {
            time: unixToDate(hourly[i].dt),
            temperature: hourly[i].temp,
            humidity: hourly[i].humidity,
            weather: hourly[i].weather.main,
            icon: hourly[i].weather.icon
        }
        hourlyWeather.push(hourForecast);
   }


   const weatherData = [currentWeather, dailyWeather, hourlyWeather];

   return weatherData;
    
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