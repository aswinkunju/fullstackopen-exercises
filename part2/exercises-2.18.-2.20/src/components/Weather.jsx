import { useEffect, useState } from 'react'
import dataServices from '../services/data'
const AllWeather = ({capital}) => {
    const[allWeather, setAllWeather] = useState(null)

    useEffect(() => {
        const response = dataServices.getWeather(capital)
          response.then(response=>setAllWeather(response))
    },[capital])

    if (allWeather === null) return null

    
    return(
        <div>
            <h2>{`weather in ${capital}`}</h2>
            <p>{`temperature ${(allWeather.main.temp - 273.5).toFixed(2)} Celsius`}</p>
            <img alt="weather icon" src={`http://openweathermap.org/img/wn/${allWeather.weather[0].icon}@2x.png`} />
            <p>{`wind ${allWeather.wind.speed} m/s`}</p> 
        </div>
    )
}
export default AllWeather