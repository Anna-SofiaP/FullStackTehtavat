import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

//TODO: Korjaa ohjelma niin että se osaa poistaa henkilön puhelinluettelosta.
//HUOM! Pitää keksiä tapa viedä handleDeleting-funktiolle tieto siitä, mikä henkilö poistetaan, eli henkilön id.

const Person = ({ name, number }) => {
  return (
    <>
      <p>{name} {number}</p>
    </>
  )
}

/*const Persons = ({ personsList, handleClick }) => {
  return (
    <>
      {personsList.map(person => <Person key={person.id} name={person.name} number={person.number}
        handleClick={handleClick}/> )}
    </>
  )
}*/

const Search = ({ filter, handleNameFiltering }) => {
  return (
    <>
      <form>
        <div> Search: <input value={filter} onChange={handleNameFiltering}/></div>
      </form>
    </>
  )
}

const PersonForm = ({ handleSubmit, name, handleNameChange, number, handleNumberChange}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div> Name: <input value={name} onChange={handleNameChange}/></div>
        <div> Number: <input value={number} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Header = (props) => {
  return (
    <h2>{props.header}</h2>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled', response)
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = { name: newName, number: newNumber }

    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDeleting = ( id, event ) => {
    event.preventDefault()
    axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then(() => {
        const newPersons = persons.filter( person => person.id !== id )
        setPersons(newPersons)
        console.log(newPersons)
      })
  }

  const personsToShow = filter.length === 0 ? persons : persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.includes(filter))

  return (
    <div>
      <Header header="Phonebook"/>
      <Search filter={filter} handleNameFiltering={(event) => setFilter(event.target.value)}/>
      <Header header="Add New Phone Number"/>
      <PersonForm handleSubmit={addPerson} 
                  name={newName} 
                  handleNameChange={(event) => setNewName(event.target.value)}
                  number={newNumber}
                  handleNumberChange={(event) => setNewNumber(event.target.value)} />
      <Header header="Phone Numbers"/>
      {personsToShow.map(person => { return (
        <>
          <Person key={person.id} name={person.name} number={person.number}/>
          <button onClick={(event) => handleDeleting(person.id, event)}>delete</button>
        </>
        )}
      )}
    </div>
  )

}

export default App