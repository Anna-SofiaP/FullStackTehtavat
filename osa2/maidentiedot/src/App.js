import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [stateOfMatch, setStateOfMatch] = useState() //stateOfMatch voi olla 1, 2 tai 3
  const [filter, setFilter] = useState('')
  const allCountries = axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => console.log(response.data))
  const alertText = "Too many matches, try a more specific filter"

  useEffect(() => {
    const filteredCountries = []

    if (filter) {
      for (let i = 0; i < allCountries.length; i++) {
        if (allCountries[i].name.common.toLowerCase().includes(filter.toLowerCase())) {
          filteredCountries.push(i)
          console.log(i)
        }
      }
    }

    console.log(filteredCountries)

    if (filteredCountries.length > 10) {
      setStateOfMatch(1)
    }

    if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
      setStateOfMatch(2)
      const newCountries = filteredCountries.map(id => allCountries[id].name.common)
      console.log(newCountries)
    }

    /*if (filter) {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          console.log(response.data)
          const newCountries = response.data
          console.log(newCountries.length)
          for (let i = 0; i < newCountries.length; i++) {
            if (newCountries[i].name.common.toLowerCase().includes(filter.toLowerCase())) {
              filteredCountries.push(i)
              console.log(i)
            }
          }
      })
    }*/

   // setCountries(filteredCountries)

    //if(filteredCountries.length > 10) {

    //}

  }, [filter])

  const handleSearch = (event) => {
    event.preventDefault()
    const newFilter = event.target.value
    setFilter(newFilter)
    console.log(newFilter)
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
