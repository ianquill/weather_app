function convertKelvintoF(temp) {
    return (temp * 9/5 - 459.67);
}

// utility function to convert unix date to standard format
function unixToDate(date) {
    const ms = date * 1000;
    return new Date(ms).toLocaleString();
}

// strips unnecessary data from json response,
// formats them, putting current + daily + hourly into a singular object
export function processWeather(file) {
   console.log(file);
   const current = file.current;

   // store retrieved data into object, getting rid of anything unneeded
   const currentWeather = {
       // send this as another argument from geocodio?
       // location: file.name,
       date: unixToDate(current.dt),
       sunrise: unixToDate(current.sunrise),
       sunset: unixToDate(current.sunset),
       temperature: Math.round(convertKelvintoF(current.temp)) + 'º F',
       feelsLike: Math.round(convertKelvintoF(current.feels_like)) + ' F',
       pressure: current.pressure + ' hPa',
       humidity: current.humidity + '% humidity',
       weather: current.weather[0].main,
       icon: current.weather[0].icon
   }

   if (file.alerts) {
    currentWeather.alerts = file.alerts[0].event;  

   }

   const daily = file.daily;
   const dailyWeather = [];

   // need to come back and add formatting here or in UI and move that^^ stuff
   for (let i = 0; i < daily.length; i++) {
       const dayForecast = {
           date: unixToDate(daily[i].dt),
           temperature: Math.round(convertKelvintoF(daily[i].temp.day)),
           tempMax: Math.round(convertKelvintoF(daily[i].temp.max)) + 'º high',
           tempMin: Math.round(convertKelvintoF(daily[i].temp.min)) + 'º low',
           pressure: daily[i].pressure,
           weather: daily[i].weather[0].main,
           icon: daily[i].weather[0].icon
       }
       dailyWeather.push(dayForecast);
   };

   const hourly = file.hourly;
   const hourlyWeather = [];

   for (let i = 0; i < hourly.length; i++) {
        const hourForecast = {
            time: unixToDate(hourly[i].dt),
            temperature: hourly[i].temp + ' ºF',
            humidity: hourly[i].humidity,
            weather: hourly[i].weather[0].main,
            icon: hourly[i].weather[0].icon
        }
        hourlyWeather.push(hourForecast);
   };


   const weatherData = [currentWeather, dailyWeather, hourlyWeather];

   return weatherData;
    
}
