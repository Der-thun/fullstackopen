import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [dataWeather, setDataWeather] = useState([])
    useEffect(() => {
      axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(responce => {
        setDataWeather(responce.data)
      })
    }, [capital])
  const temp = dataWeather.length !== 0 ? dataWeather.main.temp : ''
  const wind = dataWeather.length !== 0 ? dataWeather.wind.speed : ''
  const icon = dataWeather.length !== 0 ? dataWeather.weather[0].icon : '01d'
  const alt = dataWeather.length !== 0 ? dataWeather.weather[0].main : ''
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {temp} °C</p>
      <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt={alt} />
      <p>Wind: {wind} m/s</p>
    </div>
  )
}

export default Weather
