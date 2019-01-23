import axios from 'axios';

const apiKey = '374c5637e42f39e8d2e153c0d6fe4967';


export default async function getForecast (location) {
    const encodedURI = window.encodeURI(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=${apiKey}`);

    try {
        const result = await axios.get(encodedURI);
        return result.data.list;
    } catch (error) {
        console.log(error);
        return null;
    }
};

