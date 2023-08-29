import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState({})
  const [country, setCountry] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    // skip if filter is not defined
    if (filter) {
      axios
        .get('http://localhost:3001/countries')
        .then(response => {
          setCountries(response.data)
        })
    }
  }, [country])

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
