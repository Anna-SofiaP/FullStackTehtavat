import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Person = ({ id, name, number, handleClick }) => {
  const clickHandler = ( id, event ) => {
    handleClick(id, event)
  }

  console.log(id, typeof id)

  return (
    <div key={id}>
      <p>{name} {number} <button onClick={(event) => clickHandler(id, event)}>delete</button> </p>
    </div>
  )
}

const Persons = ({ personsList, handleClick }) => {
  console.log(personsList)
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

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }
  if (isError === true) {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
  else {
    return (
      <div className='notError'>
        {message}
      </div>
    )
  }
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
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false)
  
  useEffect(() => {
      console.log('effect')
      personService
        .getAll()
        .then(response => {
          console.log('promise fulfilled', response)
          setPersons(response.data)
        })
    }, [])

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
            setNotification(`${personToEdit.name}'s number has been changed`)
            const updatedPersons = [...persons]
            updatedPersons[index] = personToEdit
            setPersons(updatedPersons)
          })
          .catch(() => {
            setIsError(true)
            setNotification(`${personToEdit.name} has already been deleted from the server`)
          })
      }
    }
    else {
      personService
        .create(nameObject)
        .then(response => {
          setNotification(`${nameObject.name} has been added to Phonebook`)
          setPersons(persons.concat(response.data))
        })
        .catch(error => {
          console.log(error.response.data)
          setIsError(true)
          const errMessage = error.response.data.error
          setNotification(JSON.stringify(errMessage))
        })
    }

    setTimeout(() => {
      setNotification(null)
    }, 5000)

    setNewName('')
    setNewNumber('')
    setIsError(false)
  }

  const handleDeleting = ( key, event ) => {
    event.preventDefault()
    const personToDelete = persons.find(person => person.id === key)
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .remove(key)
        .then(() => {
          setNotification(`${personToDelete.name} has been deleted from Phonebook`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
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
    <Notification message={notification} isError={isError}/>
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

//ei muutoksia

export default App