export function processCurrentWeather(file) {
   console.log(file);
   const object = {
       location: file.coord,
       date: file.dt,
       temperature: file.main.temp,
       tempMax: file.main.temp_max,
       tempMin: file.main.temp_min,
       pressure: file.main.pressure,
       humidity: file.main.humidity,
       weather: file.weather[0].main
   };

   console.log(object);
    
}

export function processForecast(file) {
    const object = {
        list: file.list,
        date: file.list[0].dt_txt
    }

    console.log(object);
}