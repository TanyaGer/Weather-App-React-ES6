import React, { Component } from 'react';
import { Link } from "react-router-dom";
import getForecast from '../utils/api';
import WeatherIcon from '../utils/icon';
import queryString from 'query-string';
import {getForecastDate} from '../utils/other';


class Forecast extends Component {
    
    state = {
            city: '',
            forecast: null,
            error: null,
            loading: true
    }


    handleIfNullResults = () => {
        return this.setState(()=> ({
                error: 'Looks like there was an error.. Please enter a valid city name',
                loading: false
        }));
    }

    handleResults = (results, city) => {
        const fiveDaysForecast = [];

        const obj = results.reduce((acc, cur) => {
            const arr = cur.dt_txt.split(' ');
            const date = arr[0];
            if(!acc[date]) {
                acc[date] = [cur];
                return acc;
            } else {
                acc[date] = acc[date].concat(cur);
                return acc;
            }
        }, {});


        for(const propKey in obj){
            const arrays = obj[propKey];

            const weatherValues = arrays.reduce((acc, cur) => {
                return {
                    minTemperature: cur.main.temp_min < acc.minTemperature ? cur.main.temp_min : acc.minTemperature,
                    maxTemperature: cur.main.temp_max > acc.maxTemperature ? cur.main.temp_max : acc.maxTemperature,
                    maxHumidity: cur.main.humidity > acc.maxHumidity ? cur.main.humidity : acc.maxHumidity
                } 

            }, {
                minTemperature: 0,
                maxTemperature: 0,
                maxHumidity: 0
            });

            let date = arrays[0].dt_txt.split(' ')[0];
            let arraysDate= new Date(date).getDate();
            let todayDate = new Date().getDate();

            let icon;
            let timestamp;
            let generalWeather;

            if(arraysDate === todayDate){
                icon = arrays[0].weather[0].icon;
                timestamp = arrays[0].dt;
                generalWeather = arrays[0].weather[0].description;
                generalWeather = generalWeather[0].toUpperCase() + generalWeather.slice(1);
            } else {
                let itemIndex =  Math.round(arrays.length / 2);
                let item = arrays.slice(itemIndex, itemIndex + 1);
                icon = item[0].weather[0].icon;
                timestamp = item[0].dt;
                generalWeather = item[0].weather[0].description;
                generalWeather = generalWeather[0].toUpperCase() + generalWeather.slice(1);
            }

            let dailyInfo = {
                timestamp,
                date,
                generalWeather,
                icon,
                ...weatherValues
            };

            fiveDaysForecast.push(dailyInfo);
        };


        this.setState(() => ({
                city: city,
                forecast: fiveDaysForecast,
                error: null,
                loading: false
        }))
    };

    async componentDidMount() {
        console.log('componend did mount was called');
        const location = queryString.parse(this.props.location.search);
        const city = location.city;
        
        const results = await getForecast(city);

        if(results === null){

            return this.handleIfNullResults();
        }

        this.handleResults(results, city);      
    };


    componentDidUpdate(prevProps){
        if (prevProps !== this.props) {
            console.log('prevprops updated');
            const location = queryString.parse(this.props.location.search);
            const city = location.city;

            this.setState(() => ({
                    city: '',
                    forecast: null,
                    error: null,
                    loading: true
                }
            ));

            getForecast(city)
            .then((results) => {
                if(results === null){
                    return this.handleIfNullResults();
                }

            this.handleResults(results, city);
            
            });

        } else {
            console.log('prevprops not updated');
        }
    };
    

    render () {
        const { city, forecast, loading, error } = this.state;
        const match = this.props.match.url;

        if(loading === true){
            return(
                <h2 className='forecast-header'>Loading...</h2>
            )
        }
        
        if (!forecast && !loading) {
            return (
                <div className='forecast-container'>
                    <h2 className='forecast-header'>{error}</h2>
                </div>
            );
        }      


        return (
            <div className='forecast-container'>
                <h2 className='forecast-header'>{city}</h2>
                <ul className='forecast-container-details'>
                    {forecast.map(function(dailyForecast){
                        const {timestamp, date, icon, minTemperature, maxTemperature, maxHumidity, generalWeather} = dailyForecast
                        return (
                            <li
                                id={timestamp}
                                key={timestamp}
                                className='dailyForecast-item'>
                                <Link 
                                      to={{
                                        pathname: match + "/details",
                                        search: "?city=" + city,
                                        state: {city,
                                                date,
                                                icon,
                                                minTemperature,
                                                maxTemperature,
                                                maxHumidity,
                                                generalWeather,
                                                dailyWeather: dailyForecast }
                                      }}>
                                    <WeatherIcon icon={icon}/>
                                    <div className='forecast-date'>
                                        {getForecastDate(date).day + ', ' + getForecastDate(date).month + ' ' + getForecastDate(date).date}
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
};

export default Forecast;