import React from "react";
import { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { saveData } from "../Redux/weatherDataSlice";
import { weatherEvents } from "../events";

export const Data = React.memo(({name, wind, weather, main}) => {

    let dispatch = useDispatch();

    const weatherData = useSelector(state => state.weatherData.weatherData);

    useEffect(() => {
        dispatch(saveData({
            currentTemperature: Math.round(main.temp),
            currentTemperatureMax: Math.round(main.temp_max),
            currentTemperatureMin: Math.round(main.temp_min),
            feelsLikeTemperature: Math.round(main.feels_like),
            currentGust: (wind.gust === undefined ? null : Math.round(wind.gust)),
            currentPressure: Math.round(main.pressure),
            windSpeed: wind.speed,
        }));
    }, [dispatch, main.temp, main.feels_like, main.pressure, main.temp_max, main.temp_min, wind.gust, wind.speed]);  

    useEffect(() => {
        weatherEvents.emit("PutWeather", weatherData.currentTemperature, weather.main);
    }, [weatherData.currentTemperature, weather.main])

    return (
        <div className="Data">
            <div className="AboutWeather">

                {(weatherData.currentTemperature >= 15 && weather.main === 'Clear') && <img className="ImageWeather" src="https://cdn-icons-png.flaticon.com/512/869/869869.png" alt="Weather"/>}
                {(weatherData.currentTemperature <= 0 && weather.main === 'Clear') && <img className="ImageWeather" src="https://cdn-icons-png.flaticon.com/512/7334/7334205.png" alt="Weather"/>}
                {(weatherData.currentTemperature >= 1 && weather.main === 'Clear') && <img className="ImageWeather" src="https://img.icons8.com/fluency/512/weather.png" alt="Weather"/>}
                {(weatherData.currentTemperature >= 15 && weather.main === 'Clouds') && <img className="ImageWeather" src="https://cdn-icons-png.flaticon.com/512/3222/3222800.png" alt="Weather"/>}
                {((weatherData.currentTemperature > 5 && weatherData.currentTemperature <= 14)  && weather.main === 'Clear') && <img className="ImageWeather" src="https://cdn-icons-png.flaticon.com/512/4064/4064276.png" alt="Weather"/>}
                {((weatherData.currentTemperature < 15 && weatherData.currentTemperature >= 5 ) && weather.main === 'Clouds') && <img className="ImageWeather" src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png" alt="Weather"/>}
                {(weatherData.currentTemperature <= 4 && weather.main === 'Clouds') && <img className="ImageWeather" src="https://cdn-icons-png.flaticon.com/512/9137/9137480.png" alt="Weather"/>}
                {(weatherData.currentTemperature <= 0 && weather.main === 'Snow') && <img className="ImageWeather" src="https://cdn-icons-png.flaticon.com/512/7334/7334205.png" alt="Weather"/>}
                {(weatherData.currentTemperature >= 1 && weather.main === 'Snow') && <img className="ImageWeather" src="https://cdn-icons-png.flaticon.com/512/8841/8841406.png" alt="Weather"/>}
                {(weatherData.currentTemperature >= 1 && weather.main === 'Rain') && <img className="ImageWeather" src="https://cdn-icons-png.flaticon.com/512/1163/1163657.png" alt="Weather"/>}
                {(weatherData.currentTemperature >= 15 && weather.main === 'Mist') && <img className="ImageWeather" src="https://cdn-icons-png.flaticon.com/512/9369/9369647.png" alt="Weather"/>}
                {(weatherData.currentTemperature <= 14 && weather.main === 'Mist') && <img className="ImageWeather" src="https://cdn-icons-png.flaticon.com/512/4005/4005901.png" alt="Weather"/>}
                {(weatherData.currentTemperature <= 0 && weather.main === 'Mist') && <img className="ImageWeather" src="https://cdn-icons-png.flaticon.com/512/3104/3104495.png" alt="Weather"/>}
                {(weatherData.currentTemperature >= 15 && weather.main === 'Drizzle') && <img className="ImageWeather" src="https://cdn-icons-png.flaticon.com/512/1809/1809557.png" alt="Weather"/>}
                {(weatherData.currentTemperature <= 14 && weather.main === 'Drizzle') && <img className="ImageWeather" src="https://cdn-icons-png.flaticon.com/512/1113/1113720.png" alt="Weather"/>}
                {(weatherData.currentTemperature <= 0 && weather.main === 'Drizzle') && <img className="ImageWeather" src="https://cdn-icons-png.flaticon.com/512/9249/9249555.png" alt="Weather"/>}
                <h3 className="NameOfCountry">{name}</h3>
                <h4 className="temperature">
                {weatherData.currentTemperature}
                <img className="Deg" src="https://cdn-icons-png.flaticon.com/512/2059/2059275.png" alt="Deg"/>
                </h4>
                <p className="StateWeather">{weather.main}</p> 
                <p className="MaxMin" style={weatherData.currentTemperatureMin > 10 ||  weatherData.currentTemperatureMin > 10 || weatherData.currentTemperatureMin <= -10 || weatherData.currentTemperatureMax <= -10 ? {paddingLeft: '20px'} : null}>
                    <span>Min: {(weatherData.currentTemperatureMin === weatherData.currentTemperatureMax ? weatherData.currentTemperatureMin - 1 : weatherData.currentTemperatureMin)} <img src="https://cdn-icons-png.flaticon.com/512/5726/5726885.png" alt="Deg"/></span>
                    <span>Max: {weatherData.currentTemperatureMax} <img src="https://cdn-icons-png.flaticon.com/512/5726/5726885.png" alt="Deg"/></span>
                </p>
                <div className="OtherInformation">
                    <div className="OpacityBlock">
                    </div>
                    <p>
                         Feels like: {weatherData.feelsLikeTemperature} <img style={weatherData.feelsLikeTemperature > 10 || weatherData.feelsLikeTemperature < -10 ? {right: '130px'} : null} className="Icon" src="https://cdn-icons-png.flaticon.com/512/5726/5726885.png" alt="Deg"/>
                        </p>
                        <p>
                            Wind speed: {weatherData.windSpeed} m/s
                        </p>
                        {
                            (weatherData.currentGust === null)
                            ?
                            null
                            :
                            <p>
                                A gust of wind: {weatherData.currentGust} {weatherData.currentGust === 1 ? 'point' : "points"}
                            </p>
                        }
                        <h5>Pressure: {weatherData.currentPressure} Pa</h5>
                </div>
            </div>
        </div>
    )
})