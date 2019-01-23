import React from 'react';
import WeatherIcon from '../utils/icon';
import {getForecastDate} from '../utils/other';

export default function DailyDetails (props) {

   const {city, icon, date, minTemperature, maxTemperature, generalWeather, maxHumidity: humidity} = props.location.state;


    return (
        <div>
            <div className='daily-forecast-container'>
                <h2 className='daily-forecast-header'>{city}</h2>
                <ul className='daily-forecast-container-details'>
                    <li className='daily-forecast-item'>
                        <WeatherIcon icon={icon}/>
                        <div className='daily-forecast-date'>
                            {getForecastDate(date).day + ', ' + getForecastDate(date).month + ' ' + getForecastDate(date).date}
                        </div>
                        <div>
                            {'Min temperature  ' + Math.round(minTemperature)}
                            <WeatherIcon icon='C'/>
                        </div>
                        <div>
                            {'Max temperature  ' + Math.round(maxTemperature)}
                            <WeatherIcon icon='C'/>
                        </div>
                        <div>
                            {generalWeather}
                        </div>
                        <div>
                            {'Humidity  ' + humidity + '%'}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
};


