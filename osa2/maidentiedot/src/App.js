import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState(axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => console.log(response.data)))
  const [country, setCountry] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if (filter) {
      console.log(countries)
      
    }
    /*axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log(response)
        console.log(response.data)
        const newCountries = response.data
        setCountries(newCountries)
        const filteredCountries = newCountries.filter(country => 
          country.name.common.toLowerCase().includes(filter.toLowerCase))
      })
    //const filteredCountries = newCountries.filter(country => country.common)*/
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    const newFilter = event.target.value
    setFilter(newFilter)
  }

  return (
    <div>
      <form>
        Search for Country: <input value={filter} onChange={handleSearch} />
      </form>
    </div>
  )

}

export default App;
