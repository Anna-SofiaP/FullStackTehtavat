import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Person = ({ id, name, number, handleClick }) => {
  const clickHandler = ( id, event ) => {
    handleClick(id, event)
  }

  return (
    <div key={id}>
      <p>{name} {number} <button onClick={(event) => clickHandler(id, event)}>delete</button> </p>
    </div>
  )
}

const Persons = ({ personsList, handleClick }) => {
  return (
    <div>
      {personsList.map(person => <Person key={person.id} id={person.id} name={person.name} number={person.number}
      handleClick={handleClick}/> )}
    </div>
  )
}

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

  const addOrUpdatePerson = (event) => {
    event.preventDefault()

    const nameObject = { name: newName, number: newNumber }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook. 
        Do you want to replace the old number with a new one?`)) {
        const personToEdit = persons.find(person => person.name === newName)
        const personId = personToEdit.id
        const index = persons.findIndex(person => person.id === personId)
        personToEdit.number = newNumber
        personService
          .update(personId, personToEdit)
          .then(() => {
            const updatedPersons = [...persons]
            updatedPersons[index] = personToEdit
            setPersons(updatedPersons)
          })
      }
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

  const handleDeleting = ( key, event ) => {
    event.preventDefault()
    const personToDelete = persons.find(person => person.id === key)
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .remove(key)
        .then(() => {
          const newPersons = persons.filter( person => person.id !== key )
          setPersons(newPersons)
        })
    }
  }

  const personsToShow = filter.length === 0 ? persons : persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.includes(filter))

  return (
    <div>
    <Header header="Phonebook"/>
    <Search filter={filter} handleNameFiltering={(event) => setFilter(event.target.value)}/>
    <Header header="Add New Phone Number"/>
    <PersonForm handleSubmit={addOrUpdatePerson} 
                name={newName} 
                handleNameChange={(event) => setNewName(event.target.value)}
                number={newNumber}
                handleNumberChange={(event) => setNewNumber(event.target.value)} />
    <Header header="Phone Numbers"/>
    <Persons personsList={personsToShow} handleClick={handleDeleting}/>
  </div>
  )

}

export default App