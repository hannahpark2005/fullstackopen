import { useState, useEffect } from 'react'
import SearchCountries from './components/SearchCountries'
import Countries from './components/Countries'
import countriesService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchCountry(event.target.value)
  }

  useEffect(() => {
    countriesService
      .getAll()
      .then((allCountries) => {
        setCountries(allCountries)
      })
  }
  , [])
  if (!countries) {
    return null
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))

  return (
    <div>
      <SearchCountries searchCountry={searchCountry} handleSearchChange={handleSearchChange} />

      <Countries countriesToShow={countriesToShow} />
    </div>
  )
}

export default App