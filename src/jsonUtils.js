function convertKelvintoF(temp) {
    return (temp * 9/5 -459.67);
}

export function processCurrentWeather(file) {
   console.log(file);

   const object = {
       location: file.coord.lat.toString() + ' ' + file.coord.lon.toString(),
       date: new Date(file.dt).toString(),
       temperature: Math.round(convertKelvintoF(file.main.temp)) + ' F',
       tempMax: Math.round(convertKelvintoF(file.main.temp_max)) + ' F high',
       tempMin: Math.round(convertKelvintoF(file.main.temp_min)) + ' F low',
       pressure: file.main.pressure + ' hPa',
       humidity: file.main.humidity + '% humidity',
       weather: file.weather[0].main
   };

   console.log(object);

   return object;
    
}

export function processForecast(file) {
    const object = {
        list: file.list,
        date: file.list[0].dt_txt
    }

    console.log(object);

    return object;
}