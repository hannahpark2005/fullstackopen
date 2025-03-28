import countriesService from '../services/countries'
import { useState, useEffect } from 'react'

const Weather = ({ lat, lon }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        countriesService
            .getWeather(lat, lon)
            .then((capitalWeather) => {
                setWeather(capitalWeather)
            })
    }
        , [lat, lon])

    if (!weather) {
        return null
    }

    return (
        <div>
            <p>Temperature {weather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon" />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

const Countries = ({ countriesToShow, handleShow }) => {

    if (countriesToShow.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (countriesToShow.length === 1) {
        const country = countriesToShow[0]
        const lat = country.capitalInfo.latlng[0]
        const lon = country.capitalInfo.latlng[1]

        return (
            <div>
                <h2>{country.name.common}</h2>
                <p>Capital {country.capital}</p>
                <p>Area {country.area}</p>
                <h3>Languages</h3>
                <ul>
                    {Object.values(country.languages).map(language => (
                        <li key={language}>{language}</li>
                    ))}
                </ul>
                <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
                <h3>Weather in {country.capital}</h3>
                <Weather lat={lat} lon={lon} />
            </div>
        )
    } else {
        return (
            <ul>
                {countriesToShow.map(country => (
                    <li key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => handleShow(country.name.common)}>Show</button>
                    </li>
                ))}
            </ul>
        )
    }
}

export default Countries