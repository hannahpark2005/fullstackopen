const Countries = ({ countriesToShow, handleShow }) => {
    if (countriesToShow.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (countriesToShow.length === 1) {
        const country = countriesToShow[0]
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