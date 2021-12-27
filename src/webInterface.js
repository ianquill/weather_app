import {
    processCurrentWeather, 
    processForecast
} from './jsonUtils';

class WebInterface {
    constructor() {
        this.apiKey = '151980c4fdc5d6236c07e9ba3e28e614';
        this.currentWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?';
        this.forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?';
        this.location = '97202,us';
        this.locationType = 'zip';
        
    }

    buildURL(requestURL){
        const url = (
            requestURL + 
            this.locationType + 
            '=' + this.location + 
            '&appid=' + this.apiKey
        );
        return url;
    }

    async getCurrentWeather(){
        let currentWeather = await fetch(this.buildURL(this.currentWeatherURL), {
            mode: 'cors'
        });
        currentWeather = await currentWeather.json();
        processCurrentWeather(currentWeather);
        
    }

    async getForecast() {
        let forecast = await fetch(this.buildURL(this.forecastURL), {
            mode: 'cors'
        });
        forecast = await forecast.json();
        processForecast(forecast);
    };
}

export default WebInterface;
