import { useState } from 'react'

const Display = ({ name, number }) => {
  return (
    <>
      <p>{name} {number}</p>
    </>
  )
}

const Content = ({ persons, filter }) => {
  const filteredList = persons.filter(person =>
  person.name.toLowerCase.includes(filter.toLowerCase) || person.number.includes(filter))

  if (filter === '') {
    return (
      <>
        {persons.map(person => <Display key={person.name} name={person.name} number={person.number}/> )}
      </>
    )
  }
  return (
    <>

    </>
  )
}

const Header = (props) => {
  return (
    <h2>{props.header}</h2>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '045-2275961'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const nameObject = { name: newName, number: newNumber }
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNameFiltering = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Header header="Phonebook"/>
      <form>
        <div> search: <input value={filter} onChange={handleNameFiltering}/></div>
      </form>
      <Header header="Add New Phone Number"/>
      <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={handleNameChange}/></div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Header header="Phone Numbers"/>
      <Content persons={persons} filter={filter}/>
    </div>
  )

}

export default App

//TODO: Siirrä filtteröinti App:iin!!!